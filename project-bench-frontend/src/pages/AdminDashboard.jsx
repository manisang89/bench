import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Table, Alert, Modal, Badge, Spinner } from 'react-bootstrap'
import Header from '../components/Header'
import api from '../services/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [projects, setProjects] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])
  const [benchEmployees, setBenchEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [projectForm, setProjectForm] = useState({
    projectName: '',
    description: '',
    requiredSkills: [],
    teamSize: '',
    duration: '',
    status: 'Open'
  })
  const [newSkill, setNewSkill] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [statsRes, projRes, reqRes, benchRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/projects/all'),
        api.get('/admin/requests/pending'),
        api.get('/admin/bench-list')
      ])

      setStats(statsRes.data.data)
      setProjects(projRes.data.data)
      setPendingRequests(reqRes.data.data)
      setBenchEmployees(benchRes.data.data)
    } catch (err) {
      setError('Failed to load admin dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProjectForm({
        ...projectForm,
        requiredSkills: [...projectForm.requiredSkills, newSkill]
      })
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skill) => {
    setProjectForm({
      ...projectForm,
      requiredSkills: projectForm.requiredSkills.filter(s => s !== skill)
    })
  }

  const handleCreateProject = async () => {
    if (!projectForm.projectName || !projectForm.description || projectForm.requiredSkills.length === 0 || !projectForm.teamSize || !projectForm.duration) {
      setError('Please fill all required fields')
      return
    }

    try {
      setLoading(true)
      await api.post('/admin/projects', projectForm)
      
      setSuccess('Project created successfully')
      setShowProjectModal(false)
      setProjectForm({
        projectName: '',
        description: '',
        requiredSkills: [],
        teamSize: '',
        duration: '',
        status: 'Open'
      })
      await fetchData()
    } catch (err) {
      setError(err.response?.data?.message || 'Project creation failed')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveRequest = async (requestId) => {
    try {
      setLoading(true)
      await api.patch(`/admin/requests/action/${requestId}`, { action: 'Approved' })
      setSuccess('Request approved')
      await fetchData()
    } catch (err) {
      setError(err.response?.data?.message || 'Approval failed')
    } finally {
      setLoading(false)
    }
  }

  const handleRejectRequest = async (requestId) => {
    try {
      setLoading(true)
      await api.patch(`/admin/requests/action/${requestId}`, { action: 'Rejected' })
      setSuccess('Request rejected')
      await fetchData()
    } catch (err) {
      setError(err.response?.data?.message || 'Rejection failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        setLoading(true)
        await api.delete(`/admin/projects/${projectId}`)
        setSuccess('Project deleted')
        await fetchData()
      } catch (err) {
        setError('Deletion failed')
      } finally {
        setLoading(false)
      }
    }
  }

  if (loading && stats === null) {
    return (
      <>
        <Header />
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <Spinner animation="border" variant="primary" />
        </Container>
      </>
    )
  }

  return (
    <>
      <Header />
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <div className="page-header">
              <h1>Admin Dashboard</h1>
            </div>
          </Col>
        </Row>

        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <div className="stat-card">
              <div className="stat-value">{stats?.totalEmployees}</div>
              <p className="stat-label">Total Employees</p>
            </div>
          </Col>
          <Col md={3} className="mb-3">
            <div className="stat-card">
              <div className="stat-value">{stats?.benchEmployees}</div>
              <p className="stat-label">On Bench</p>
            </div>
          </Col>
          <Col md={3} className="mb-3">
            <div className="stat-card">
              <div className="stat-value">{stats?.totalProjects}</div>
              <p className="stat-label">Total Projects</p>
            </div>
          </Col>
          <Col md={3} className="mb-3">
            <div className="stat-card">
              <div className="stat-value">{stats?.pendingRequests}</div>
              <p className="stat-label">Pending Requests</p>
            </div>
          </Col>
        </Row>

        {/* Navigation Tabs */}
        <Row className="mb-4">
          <Col>
            <div className="btn-group w-100" role="group">
              <Button
                variant={activeTab === 'dashboard' ? 'primary' : 'outline-primary'}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'projects' ? 'primary' : 'outline-primary'}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </Button>
              <Button
                variant={activeTab === 'requests' ? 'primary' : 'outline-primary'}
                onClick={() => setActiveTab('requests')}
              >
                Pending Requests
              </Button>
              <Button
                variant={activeTab === 'employees' ? 'primary' : 'outline-primary'}
                onClick={() => setActiveTab('employees')}
              >
                Employees
              </Button>
            </div>
          </Col>
        </Row>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <Row>
            <Col lg={8}>
              <Card>
                <Card.Body>
                  <h5 className="card-title mb-3">System Overview</h5>
                  <p className="text-muted">
                    Manage projects, review resource requests, and oversee employee allocations.
                  </p>
                  <div className="mt-4">
                    <h6 className="mb-3">Quick Actions</h6>
                    <Button variant="primary" onClick={() => setShowProjectModal(true)} className="me-2">
                      Create Project
                    </Button>
                    <Button variant="info" onClick={() => setActiveTab('requests')}>
                      Review Requests ({pendingRequests.length})
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <Row>
            <Col lg={12} className="mb-4">
              <Button
                variant="primary"
                onClick={() => setShowProjectModal(true)}
                className="mb-3"
              >
                Create New Project
              </Button>
            </Col>

            <Col lg={12}>
              <Card>
                <Card.Body>
                  <h5 className="card-title mb-3">All Projects ({projects.length})</h5>
                  {projects.length > 0 ? (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Project Name</th>
                          <th>Description</th>
                          <th>Required Skills</th>
                          <th>Team Size</th>
                          <th>Duration</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((proj) => (
                          <tr key={proj._id}>
                            <td>{proj.projectName}</td>
                            <td>{proj.description}</td>
                            <td>
                              {proj.requiredSkills.map((skill) => (
                                <Badge key={skill} bg="info" className="me-1">
                                  {skill}
                                </Badge>
                              ))}
                            </td>
                            <td>{proj.teamSize}</td>
                            <td>{proj.duration}</td>
                            <td><Badge bg="success">{proj.status}</Badge></td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteProject(proj._id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p className="text-muted">No projects created yet</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <h5 className="card-title mb-3">Pending Requests ({pendingRequests.length})</h5>
                  {pendingRequests.length > 0 ? (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Manager</th>
                          <th>Employee</th>
                          <th>Project</th>
                          <th>Justification</th>
                          <th>Requested Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingRequests.map((req) => (
                          <tr key={req._id}>
                            <td>{req.managerId?.name}</td>
                            <td>{req.employeeId?.name}</td>
                            <td>{req.projectId?.projectName}</td>
                            <td>{req.justification}</td>
                            <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                            <td>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleApproveRequest(req._id)}
                                className="me-1"
                              >
                                Approve
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRejectRequest(req._id)}
                              >
                                Reject
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p className="text-muted">No pending requests</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Employees Tab */}
        {activeTab === 'employees' && (
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <h5 className="card-title mb-3">All Employees ({benchEmployees.length})</h5>
                  {benchEmployees.length > 0 ? (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Employee ID</th>
                          <th>Role</th>
                          <th>Skills</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {benchEmployees.map((emp) => (
                          <tr key={emp._id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.employeeId}</td>
                            <td><Badge bg="secondary">{emp.role}</Badge></td>
                            <td>
                              {emp.skills.map((skill) => (
                                <Badge key={skill} bg="info" className="me-1">
                                  {skill}
                                </Badge>
                              ))}
                            </td>
                            <td>
                              <Badge bg={emp.benchStatus ? 'success' : 'warning'}>
                                {emp.benchStatus ? 'On Bench' : 'Assigned'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p className="text-muted">No employees found</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Project Modal */}
        <Modal show={showProjectModal} onHide={() => setShowProjectModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Create New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Project Name *</Form.Label>
                <Form.Control
                  type="text"
                  value={projectForm.projectName}
                  onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })}
                  placeholder="Enter project name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Enter project description"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Add Required Skills *</Form.Label>
                <div className="d-flex gap-2 mb-2">
                  <Form.Control
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter skill"
                  />
                  <Button variant="primary" onClick={handleAddSkill}>
                    Add
                  </Button>
                </div>
                <div>
                  {projectForm.requiredSkills.map((skill) => (
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

              <Form.Group className="mb-3">
                <Form.Label>Team Size *</Form.Label>
                <Form.Control
                  type="number"
                  value={projectForm.teamSize}
                  onChange={(e) => setProjectForm({ ...projectForm, teamSize: e.target.value })}
                  placeholder="Enter team size"
                  min="1"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Duration *</Form.Label>
                <Form.Control
                  type="text"
                  value={projectForm.duration}
                  onChange={(e) => setProjectForm({ ...projectForm, duration: e.target.value })}
                  placeholder="e.g., 6 months"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={projectForm.status}
                  onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowProjectModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateProject}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}
