import { describe, it, expect, beforeEach } from "vitest"

describe("Organization Verification Contract", () => {
  let contractState = {
    organizations: new Map(),
    organizationPrincipals: new Map(),
    nextOrgId: 1,
    contractOwner: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  }
  
  beforeEach(() => {
    contractState = {
      organizations: new Map(),
      organizationPrincipals: new Map(),
      nextOrgId: 1,
      contractOwner: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    }
  })
  
  // Mock contract functions
  const registerOrganization = (sender, name, contact) => {
    if (contractState.organizationPrincipals.has(sender)) {
      return { error: "already-exists", code: 103 }
    }
    
    const orgId = contractState.nextOrgId
    contractState.organizations.set(orgId, {
      name,
      contact,
      verified: false,
      verificationDate: 0,
      verifier: contractState.contractOwner,
    })
    contractState.organizationPrincipals.set(sender, orgId)
    contractState.nextOrgId += 1
    
    return { success: true, orgId }
  }
  
  const verifyOrganization = (sender, orgId) => {
    if (sender !== contractState.contractOwner) {
      return { error: "owner-only", code: 100 }
    }
    
    const org = contractState.organizations.get(orgId)
    if (!org) {
      return { error: "not-found", code: 102 }
    }
    
    if (org.verified) {
      return { error: "already-verified", code: 101 }
    }
    
    contractState.organizations.set(orgId, {
      ...org,
      verified: true,
      verificationDate: Date.now(),
      verifier: sender,
    })
    
    return { success: true }
  }
  
  const isVerifiedOrganization = (principal) => {
    const orgId = contractState.organizationPrincipals.get(principal)
    if (!orgId) return false
    
    const org = contractState.organizations.get(orgId)
    return org ? org.verified : false
  }
  
  const getOrganization = (orgId) => {
    return contractState.organizations.get(orgId) || null
  }
  
  describe("Organization Registration", () => {
    it("should register a new organization successfully", () => {
      const result = registerOrganization(
          "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
          "Wildlife Research Institute",
          "contact@wri.org",
      )
      
      expect(result.success).toBe(true)
      expect(result.orgId).toBe(1)
      expect(contractState.nextOrgId).toBe(2)
    })
    
    it("should prevent duplicate organization registration", () => {
      const principal = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
      
      registerOrganization(principal, "First Org", "first@org.com")
      const result = registerOrganization(principal, "Second Org", "second@org.com")
      
      expect(result.error).toBe("already-exists")
      expect(result.code).toBe(103)
    })
    
    it("should store organization data correctly", () => {
      registerOrganization("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG", "Marine Biology Institute", "info@mbi.org")
      
      const org = getOrganization(1)
      expect(org.name).toBe("Marine Biology Institute")
      expect(org.contact).toBe("info@mbi.org")
      expect(org.verified).toBe(false)
    })
  })
  
  describe("Organization Verification", () => {
    beforeEach(() => {
      registerOrganization("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG", "Test Organization", "test@org.com")
    })
    
    it("should verify organization when called by owner", () => {
      const result = verifyOrganization(contractState.contractOwner, 1)
      
      expect(result.success).toBe(true)
      
      const org = getOrganization(1)
      expect(org.verified).toBe(true)
      expect(org.verificationDate).toBeGreaterThan(0)
    })
    
    it("should reject verification from non-owner", () => {
      const result = verifyOrganization("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG", 1)
      
      expect(result.error).toBe("owner-only")
      expect(result.code).toBe(100)
    })
    
    it("should reject verification of non-existent organization", () => {
      const result = verifyOrganization(contractState.contractOwner, 999)
      
      expect(result.error).toBe("not-found")
      expect(result.code).toBe(102)
    })
    
    it("should reject double verification", () => {
      verifyOrganization(contractState.contractOwner, 1)
      const result = verifyOrganization(contractState.contractOwner, 1)
      
      expect(result.error).toBe("already-verified")
      expect(result.code).toBe(101)
    })
  })
  
  describe("Verification Status Check", () => {
    it("should return false for unregistered principal", () => {
      const result = isVerifiedOrganization("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")
      expect(result).toBe(false)
    })
    
    it("should return false for unverified organization", () => {
      registerOrganization("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG", "Unverified Org", "unverified@org.com")
      
      const result = isVerifiedOrganization("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")
      expect(result).toBe(false)
    })
    
    it("should return true for verified organization", () => {
      const principal = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
      
      registerOrganization(principal, "Verified Org", "verified@org.com")
      verifyOrganization(contractState.contractOwner, 1)
      
      const result = isVerifiedOrganization(principal)
      expect(result).toBe(true)
    })
  })
  
  describe("Data Retrieval", () => {
    it("should retrieve organization data correctly", () => {
      registerOrganization("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG", "Data Test Org", "data@test.org")
      
      const org = getOrganization(1)
      expect(org).toBeTruthy()
      expect(org.name).toBe("Data Test Org")
      expect(org.contact).toBe("data@test.org")
      expect(org.verified).toBe(false)
    })
    
    it("should return null for non-existent organization", () => {
      const org = getOrganization(999)
      expect(org).toBeNull()
    })
  })
  
  describe("Integration Scenarios", () => {
    it("should handle multiple organization workflow", () => {
      // Register multiple organizations
      const org1Result = registerOrganization(
          "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
          "Wildlife Institute",
          "wildlife@institute.org",
      )
      const org2Result = registerOrganization(
          "ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0",
          "Marine Research Center",
          "marine@research.org",
      )
      
      expect(org1Result.orgId).toBe(1)
      expect(org2Result.orgId).toBe(2)
      
      // Verify first organization
      verifyOrganization(contractState.contractOwner, 1)
      
      // Check verification status
      expect(isVerifiedOrganization("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")).toBe(true)
      expect(isVerifiedOrganization("ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0")).toBe(false)
      
      // Verify second organization
      verifyOrganization(contractState.contractOwner, 2)
      expect(isVerifiedOrganization("ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0")).toBe(true)
    })
  })
})
