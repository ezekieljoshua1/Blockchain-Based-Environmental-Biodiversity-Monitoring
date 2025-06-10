# Blockchain-Based Environmental Biodiversity Monitoring System

A comprehensive blockchain solution for tracking, monitoring, and coordinating biodiversity conservation efforts using Clarity smart contracts on the Stacks blockchain.

## Overview

This system provides a decentralized platform for environmental organizations to collaborate on biodiversity monitoring and conservation projects. It ensures data integrity, transparency, and accountability in conservation efforts through blockchain technology.

## Features

### 🏢 Organization Verification
- Register and verify biodiversity research organizations
- Ensure only authorized entities can contribute data
- Maintain organization credentials and verification status

### 🦋 Species Tracking
- Record and track biodiversity species data
- Log species observations with location and population data
- Maintain comprehensive species databases

### 🌿 Habitat Monitoring
- Register and monitor biodiversity habitats
- Conduct habitat health assessments
- Track environmental conditions and threats

### 🤝 Conservation Coordination
- Create and manage conservation projects
- Coordinate multi-organization initiatives
- Track project milestones and funding

### 📊 Impact Assessment
- Generate comprehensive impact reports
- Track conservation metrics and indicators
- Measure conservation effectiveness

## Smart Contracts

### 1. Organization Verification (\`organization-verification.clar\`)
Manages the registration and verification of biodiversity research organizations.

**Key Functions:**
- \`register-organization\`: Register a new organization
- \`verify-organization\`: Verify an organization (owner only)
- \`is-verified-organization\`: Check verification status

### 2. Species Tracking (\`species-tracking.clar\`)
Handles species data recording and observation tracking.

**Key Functions:**
- \`record-species\`: Add new species to the database
- \`record-observation\`: Log species observations
- \`get-species\`: Retrieve species information

### 3. Habitat Monitoring (\`habitat-monitoring.clar\`)
Manages habitat registration and health assessments.

**Key Functions:**
- \`register-habitat\`: Register new habitat areas
- \`record-assessment\`: Conduct habitat health assessments
- \`get-habitat\`: Retrieve habitat information

### 4. Conservation Coordination (\`conservation-coordination.clar\`)
Coordinates conservation projects and multi-organization collaboration.

**Key Functions:**
- \`create-project\`: Start new conservation projects
- \`join-project\`: Organizations join existing projects
- \`add-milestone\`: Add project milestones
- \`complete-milestone\`: Mark milestones as completed

### 5. Impact Assessment (\`impact-assessment.clar\`)
Generates impact reports and tracks conservation effectiveness.

**Key Functions:**
- \`create-impact-report\`: Generate comprehensive impact reports
- \`add-conservation-metric\`: Add measurable conservation metrics
- \`create-impact-indicator\`: Define impact indicators
- \`calculate-system-health\`: Calculate overall system health

## Getting Started

### Prerequisites
- Stacks blockchain development environment
- Clarity CLI tools
- Node.js and npm for testing

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd biodiversity-monitoring
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run tests:
   \`\`\`bash
   npm test
   \`\`\`

### Deployment

1. Deploy contracts to Stacks testnet:
   \`\`\`bash
   clarinet deploy --testnet
   \`\`\`

2. Verify contract deployment:
   \`\`\`bash
   clarinet console
   \`\`\`

## Usage Examples

### Register an Organization
\`\`\`clarity
(contract-call? .organization-verification register-organization "Wildlife Research Institute" "contact@wri.org")
\`\`\`

### Record a Species
\`\`\`clarity
(contract-call? .species-tracking record-species "Panthera leo" "African Lion" "Vulnerable" "Savanna")
\`\`\`

### Create Conservation Project
\`\`\`clarity
(contract-call? .conservation-coordination create-project
"Lion Conservation Initiative"
"Protect African lion populations"
u1 u1 u100000 u1000)
\`\`\`

## Data Flow

1. **Organization Registration**: Organizations register and get verified
2. **Data Collection**: Verified organizations record species and habitat data
3. **Project Creation**: Organizations create conservation projects
4. **Collaboration**: Multiple organizations join projects
5. **Impact Tracking**: Regular impact assessments and reporting
6. **System Health**: Overall biodiversity health monitoring

## Security Features

- **Access Control**: Only verified organizations can contribute data
- **Data Integrity**: Blockchain ensures immutable records
- **Transparency**: All activities are publicly auditable
- **Decentralization**: No single point of failure

## Testing

The system includes comprehensive tests using Vitest:

\`\`\`bash
npm run test
\`\`\`

Tests cover:
- Organization verification workflows
- Species and habitat data recording
- Conservation project coordination
- Impact assessment calculations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Join our community discussions

## Roadmap

- [ ] Integration with IoT sensors for automated data collection
- [ ] Mobile app for field researchers
- [ ] Advanced analytics and machine learning integration
- [ ] Carbon credit integration
- [ ] International conservation database integration

---

**Building a sustainable future through blockchain-powered biodiversity monitoring** 🌍🦋🌿
