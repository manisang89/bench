import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await login(email, password)
      
      if (user.role === 'Admin') {
        navigate('/admin/dashboard')
      } else if (user.role === 'Manager') {
        navigate('/manager/dashboard')
      } else {
        navigate('/employee/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <Container>
        <Row className="min-vh-100 d-flex justify-content-center align-items-center">
          <Col md={6} lg={4}>
            <Card className="shadow-lg auth-card">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4 fw-bold">Bench Allocation</h2>
                <p className="text-center text-muted mb-4">Sign in to your account</p>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Form>

                <hr className="my-4" />

                <p className="text-center text-muted mb-0">
                  Don't have an account? <Link to="/register">Register here</Link>
                </p>

                <div className="mt-4 pt-3 border-top">
                  <p className="text-muted small mb-2"><strong>Demo Credentials:</strong></p>
                  <p className="text-muted small mb-1">Admin: admin@bench.com / Admin@123</p>
                  <p className="text-muted small mb-1">Manager: manager@bench.com / Manager@123</p>
                  <p className="text-muted small">Employee: employee@bench.com / Employee@123</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
