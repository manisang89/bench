import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Table, Alert, Modal, Badge } from 'react-bootstrap'
import Header from '../components/Header'
import api from '../services/api'

export default function EmployeeDashboard() {
  const [profile, setProfile] = useState(null)
  const [project, setProject] = useState(null)
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState('')
  const [contactDetails, setContactDetails] = useState('')
  const [benchStatus, setBenchStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  useEffect(() => {
    fetchProfile()
    fetchProject()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/employee/profile')
      setProfile(response.data.data)
      setSkills(response.data.data.skills || [])
      setContactDetails(response.data.data.contactDetails || '')
      setBenchStatus(response.data.data.benchStatus)
    } catch (err) {
      setError('Failed to load profile')
    }
  }

  const fetchProject = async () => {
    try {
      const response = await api.get('/employee/project')
      setProject(response.data.data)
    } catch (err) {
      // No project assigned yet
      setProject(null)
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const handleUpdateProfile = async () => {
    try {
      setLoading(true)
      setError('')
      setSuccess('')
      
      await api.put('/employee/update', {
        skills,
        contactDetails
      })
      
      setSuccess('Profile updated successfully')
      await fetchProfile()
      setShowUpdateModal(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateBenchStatus = async (status) => {
    try {
      setLoading(true)
      await api.patch('/employee/status', { status })
      setBenchStatus(status === 'Bench')
      setSuccess(`Status updated to ${status}`)
      await fetchProfile()
    } catch (err) {
      setError(err.response?.data?.message || 'Status update failed')
    } finally {
      setLoading(false)
    }
  }

  if (!profile) {
    return <div className="text-center p-5">Loading...</div>
  }

  return (
    <>
      <Header />
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <div className="page-header">
              <h1>Employee Dashboard</h1>
            </div>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Row>
          <Col lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <h5 className="card-title mb-3">Profile Information</h5>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Employee ID:</strong> {profile.employeeId}</p>
                <p><strong>Role:</strong> <Badge bg="primary">{profile.role}</Badge></p>
                <p>
                  <strong>Status:</strong>{' '}
                  <Badge bg={benchStatus ? 'success' : 'warning'}>
                    {benchStatus ? 'On Bench' : 'Assigned'}
                  </Badge>
                </p>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setShowUpdateModal(true)}
                  className="w-100"
                >
                  Update Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <h5 className="card-title mb-3">Skills</h5>
                {skills.length > 0 ? (
                  <div>
                    {skills.map((skill) => (
                      <Badge key={skill} bg="info" className="me-2 mb-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No skills added yet</p>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <h5 className="card-title mb-3">Bench Status</h5>
                {benchStatus ? (
                  <>
                    <p className="text-muted">You are currently available for projects</p>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleUpdateBenchStatus('Assigned')}
                      className="w-100"
                      disabled={loading}
                    >
                      Mark as Assigned
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-muted">You are currently assigned to a project</p>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdateBenchStatus('Bench')}
                      className="w-100"
                      disabled={loading || project !== null}
                      title={project ? "You cannot mark as Bench while assigned to a project" : ""}
                    >
                      Mark as Bench
                    </Button>
                    {project && (
                      <small className="text-danger d-block mt-2">
                        ⚠️ You cannot change to Bench status while assigned to a project
                      </small>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {project && (
          <Row>
            <Col lg={8}>
              <Card>
                <Card.Body>
                  <h5 className="card-title mb-3">Assigned Project</h5>
                  <Table responsive>
                    <tbody>
                      <tr>
                        <td><strong>Project Name:</strong></td>
                        <td>{project.projectName}</td>
                      </tr>
                      <tr>
                        <td><strong>Description:</strong></td>
                        <td>{project.description}</td>
                      </tr>
                      <tr>
                        <td><strong>Required Skills:</strong></td>
                        <td>
                          {project.requiredSkills.map((skill) => (
                            <Badge key={skill} bg="primary" className="me-2">
                              {skill}
                            </Badge>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Team Size:</strong></td>
                        <td>{project.teamSize}</td>
                      </tr>
                      <tr>
                        <td><strong>Duration:</strong></td>
                        <td>{project.duration}</td>
                      </tr>
                      <tr>
                        <td><strong>Status:</strong></td>
                        <td><Badge bg="success">{project.status}</Badge></td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Contact Details</Form.Label>
                <Form.Control
                  type="text"
                  value={contactDetails}
                  onChange={(e) => setContactDetails(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Add Skill</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Enter skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    onClick={handleAddSkill}
                  >
                    Add
                  </Button>
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Current Skills</Form.Label>
                <div>
                  {skills.map((skill) => (
                    <Badge key={skill} bg="info" className="me-2 mb-2">
                      {skill}
                      <button
                        className="ms-2 btn-close btn-close-white"
                        onClick={() => handleRemoveSkill(skill)}
                        style={{ fontSize: '0.7rem' }}
                      ></button>
                    </Badge>
                  ))}
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleUpdateProfile}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}
