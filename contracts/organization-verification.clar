;; Organization Verification Contract
;; Manages verification of biodiversity research organizations

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-already-verified (err u101))
(define-constant err-not-found (err u102))
(define-constant err-already-exists (err u103))

;; Data structures
(define-map organizations
  { org-id: uint }
  {
    name: (string-ascii 100),
    contact: (string-ascii 100),
    verified: bool,
    verification-date: uint,
    verifier: principal
  }
)

(define-map organization-principals
  { principal: principal }
  { org-id: uint }
)

(define-data-var next-org-id uint u1)

;; Register a new organization
(define-public (register-organization (name (string-ascii 100)) (contact (string-ascii 100)))
  (let ((org-id (var-get next-org-id)))
    (asserts! (is-none (map-get? organization-principals { principal: tx-sender })) err-already-exists)
    (map-set organizations
      { org-id: org-id }
      {
        name: name,
        contact: contact,
        verified: false,
        verification-date: u0,
        verifier: contract-owner
      }
    )
    (map-set organization-principals { principal: tx-sender } { org-id: org-id })
    (var-set next-org-id (+ org-id u1))
    (ok org-id)
  )
)

;; Verify an organization (owner only)
(define-public (verify-organization (org-id uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (match (map-get? organizations { org-id: org-id })
      org-data
      (begin
        (asserts! (not (get verified org-data)) err-already-verified)
        (map-set organizations
          { org-id: org-id }
          (merge org-data {
            verified: true,
            verification-date: block-height,
            verifier: tx-sender
          })
        )
        (ok true)
      )
      err-not-found
    )
  )
)

;; Get organization info
(define-read-only (get-organization (org-id uint))
  (map-get? organizations { org-id: org-id })
)

;; Check if principal is verified organization
(define-read-only (is-verified-organization (principal principal))
  (match (map-get? organization-principals { principal: principal })
    org-info
    (match (map-get? organizations { org-id: (get org-id org-info) })
      org-data (get verified org-data)
      false
    )
    false
  )
)

;; Get organization ID by principal
(define-read-only (get-org-id-by-principal (principal principal))
  (map-get? organization-principals { principal: principal })
)
