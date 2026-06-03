'use client'

import React, { useState, useEffect } from 'react'
import {
  Search,
  ChevronDown,
  ChevronUp,
  Download,
  LogOut,
  RefreshCw,
  Users,
  Handshake,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Briefcase,
  FileText
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import {
  getAdminStats,
  getAdminCollabs,
  updateCollabStatus,
  AdminStats,
  AdminCollabRequest
} from '@/lib/api'
import { jsPDF } from 'jspdf'

export default function AdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [collabs, setCollabs] = useState<AdminCollabRequest[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  
  // Expanded rows state
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  // Search & Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const statsData = await getAdminStats()
      const collabsData = await getAdminCollabs()
      setStats(statsData)
      setCollabs(collabsData)
      setIsAdmin(true)
    } catch (err: unknown) {
      console.error('Failed to load admin data:', err)
      const msg = (err as Error).message || ''
      if (msg.includes('Admin access required') || msg.includes('Not authenticated')) {
        setIsAdmin(false)
      } else {
        setError(msg || 'An unexpected error occurred while loading dashboard.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Check session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setIsAdmin(false)
        setLoading(false)
      } else {
        loadData()
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAdmin(false)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    try {
      await updateCollabStatus(id, newStatus)
      // Update local state
      setCollabs(prev =>
        prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
      )
      // Reload stats to reflect count changes
      const statsData = await getAdminStats()
      setStats(statsData)
    } catch (err: unknown) {
      alert((err as Error).message || 'Failed to update status')
    }
  }

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const downloadPDF = (collab: AdminCollabRequest) => {
    const doc = new jsPDF()
    const audit = collab.audit
    const profile = collab.profile
    const name = profile?.full_name || audit?.name || 'Creator'

    // ── HEADER ──
    doc.setFillColor(115, 66, 226) // Purple theme color
    doc.rect(0, 0, 210, 36, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text('KARA COLLABORATION BRIEF', 15, 23)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 155, 23)

    let y = 48

    // Helper for sections
    const addSectionHeader = (title: string) => {
      doc.setFillColor(242, 242, 238) // Light warm gray
      doc.rect(15, y, 180, 8, 'F')
      doc.setTextColor(25, 40, 55)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text(title, 18, y + 6)
      y += 14
    }

    // Helper for rows
    const addField = (label: string, value: string | null | undefined) => {
      const text = value || 'N/A'
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(107, 126, 141) // Gray-ish
      doc.text(`${label.toUpperCase()}:`, 18, y)
      
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(25, 40, 55)
      doc.setFontSize(10)
      
      const splitText = doc.splitTextToSize(text, 130)
      doc.text(splitText, 58, y)
      
      y += (splitText.length * 5) + 3
      
      if (y > 275) {
        doc.addPage()
        y = 20
      }
    }

    // 1. Account details
    addSectionHeader('1. CREATOR ACCOUNT INFO')
    addField('Full Name', name)
    addField('Email Address', profile?.email || 'N/A')
    addField('Primary Platform', audit?.platform)
    addField('Profile Link', audit?.profile_link)
    addField('Niche', audit?.niche)

    // Social accounts
    const socials = [
      audit?.ig_connected ? 'Instagram' : '',
      audit?.yt_connected ? 'YouTube' : '',
      audit?.tt_connected ? 'TikTok' : '',
      audit?.li_connected ? 'LinkedIn' : ''
    ].filter(Boolean).join(', ')
    addField('Connected Channels', socials || 'None connected')

    if (y > 230) {
      doc.addPage()
      y = 20
    }

    // 2. Audit form details
    addSectionHeader('2. CREATOR AUDIT DETAILS')
    addField('Biggest Problems', audit?.biggest_problems?.join(', '))
    addField('Goals', audit?.goals?.join(', '))
    addField('Help Needed', audit?.help_needed?.join(', '))
    addField('Preferred Contact', audit?.contact_type)
    addField('Specific Note', audit?.specific_note)

    if (y > 230) {
      doc.addPage()
      y = 20
    }

    // 3. Collab Form details
    addSectionHeader('3. BRAND COLLABORATION REQUEST')
    addField('Request Status', collab.status.toUpperCase())
    addField('Brand Types', collab.brand_types?.join(', '))
    addField('Collaboration Types', collab.collab_types?.join(', '))
    addField('Promote Unused Products?', collab.promote_unused)
    addField('Contact Info provided', collab.contact_detail)
    addField('Dream Brands list', collab.dream_brands)

    doc.save(`KARA_Collab_Brief_${name.replace(/\s+/g, '_')}.pdf`)
  }

  // Filter logic
  const filteredCollabs = collabs.filter(collab => {
    const audit = collab.audit
    const profile = collab.profile
    const name = (profile?.full_name || audit?.name || '').toLowerCase()
    const email = (profile?.email || '').toLowerCase()
    const platform = (audit?.platform || '').toLowerCase()
    const niche = (audit?.niche || '').toLowerCase()
    
    const searchMatch =
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      platform.includes(search.toLowerCase()) ||
      niche.includes(search.toLowerCase())

    const statusMatch = statusFilter === 'all' || collab.status === statusFilter
    const platformMatch =
      platformFilter === 'all' || platform === platformFilter.toLowerCase()

    return searchMatch && statusMatch && platformMatch
  })

  // Aggregate Insights
  const getInsights = () => {
    const brandTypeCounts: Record<string, number> = {}
    const collabTypeCounts: Record<string, number> = {}
    let totalBrandsSelected = 0
    let totalCollabsSelected = 0

    collabs.forEach(c => {
      c.brand_types?.forEach(b => {
        brandTypeCounts[b] = (brandTypeCounts[b] || 0) + 1
        totalBrandsSelected++
      })
      c.collab_types?.forEach(co => {
        collabTypeCounts[co] = (collabTypeCounts[co] || 0) + 1
        totalCollabsSelected++
      })
    })

    const topBrands = Object.entries(brandTypeCounts)
      .map(([name, count]) => ({ name, count, percent: Math.round((count / collabs.length) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    const topCollabs = Object.entries(collabTypeCounts)
      .map(([name, count]) => ({ name, count, percent: Math.round((count / collabs.length) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return { topBrands, topCollabs }
  }

  const { topBrands, topCollabs } = getInsights()

  // ── Access Denied State ──
  if (isAdmin === false) {
    return (
      <div className="admin-layout">
        <div className="admin-state-container">
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(227, 76, 103, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-rose)', marginBottom: '16px'
          }}>
            <AlertTriangle size={32} />
          </div>
          <h2 className="admin-state-title" style={{ color: 'var(--color-ink)' }}>Access Denied</h2>
          <p className="admin-state-desc">
            You do not have administrative privileges to access this area.
            Please ensure you are signed in with an authorized admin email.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="admin-btn admin-btn--secondary" onClick={() => router.push('/auth')}>
              Sign In with Another Account
            </button>
            <button className="admin-btn admin-btn--primary" onClick={() => router.push('/')}>
              Go to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-layout">
      <div className="admin-container">
        
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header__logo">
            <h1 className="admin-header__title">
              KARA Admin <span className="admin-header__badge">Dashboard</span>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="admin-header__logout" onClick={loadData} title="Refresh data">
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              Reload
            </button>
            <button className="admin-header__logout" onClick={handleSignOut}>
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </header>

        {loading && collabs.length === 0 ? (
          <div className="admin-state-container">
            <RefreshCw size={40} className="animate-spin" style={{ color: 'var(--color-accent)' }} />
            <h3 className="admin-state-title">Loading Administrative Dashboard...</h3>
            <p className="admin-state-desc">Fetching brand collaboration requests and creator audits.</p>
          </div>
        ) : error ? (
          <div className="admin-state-container">
            <AlertTriangle size={40} style={{ color: 'var(--color-rose)' }} />
            <h3 className="admin-state-title">Failed to Load Dashboard</h3>
            <p className="admin-state-desc">{error}</p>
            <button className="admin-btn admin-btn--primary" onClick={loadData}>
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="admin-stats">
              <div className="admin-stat-card">
                <div className="admin-stat-card__info">
                  <span className="admin-stat-card__label">Total Creators</span>
                  <span className="admin-stat-card__val">{stats?.totalUsers ?? 0}</span>
                </div>
                <div className="admin-stat-card__icon-wrap purple">
                  <Users size={22} />
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-card__info">
                  <span className="admin-stat-card__label">Collab Requests</span>
                  <span className="admin-stat-card__val">{stats?.totalCollabs ?? 0}</span>
                </div>
                <div className="admin-stat-card__icon-wrap blue">
                  <Handshake size={22} />
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-card__info">
                  <span className="admin-stat-card__label">Pending Decisions</span>
                  <span className="admin-stat-card__val">{stats?.pendingCollabs ?? 0}</span>
                </div>
                <div className="admin-stat-card__icon-wrap orange">
                  <Clock size={22} />
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-card__info">
                  <span className="admin-stat-card__label">Completed Matches</span>
                  <span className="admin-stat-card__val">{stats?.completedCollabs ?? 0}</span>
                </div>
                <div className="admin-stat-card__icon-wrap green">
                  <CheckCircle2 size={22} />
                </div>
              </div>
            </div>

            {/* Insights Section */}
            {collabs.length > 0 && (
              <div className="admin-insights">
                {/* Chart 1: Brand Types */}
                <div className="admin-chart-card">
                  <h3 className="admin-chart-card__title">Top Requested Brand Niches</h3>
                  <div className="admin-bar-list">
                    {topBrands.length > 0 ? topBrands.map(tb => (
                      <div key={tb.name} className="admin-bar-item">
                        <div className="admin-bar-item__label-row">
                          <span>{tb.name}</span>
                          <span>{tb.count} ({tb.percent}%)</span>
                        </div>
                        <div className="admin-bar-item__track">
                          <div className="admin-bar-item__fill" style={{ width: `${tb.percent}%` }} />
                        </div>
                      </div>
                    )) : (
                      <div style={{ color: 'var(--color-ink-3)', fontSize: '13px' }}>No brand types specified.</div>
                    )}
                  </div>
                </div>

                {/* Chart 2: Collab Types */}
                <div className="admin-chart-card">
                  <h3 className="admin-chart-card__title">Preferred Collaboration Models</h3>
                  <div className="admin-bar-list">
                    {topCollabs.length > 0 ? topCollabs.map(tc => (
                      <div key={tc.name} className="admin-bar-item">
                        <div className="admin-bar-item__label-row">
                          <span>{tc.name}</span>
                          <span>{tc.count} ({tc.percent}%)</span>
                        </div>
                        <div className="admin-bar-item__track">
                          <div className="admin-bar-item__fill" style={{ width: `${tc.percent}%` }} />
                        </div>
                      </div>
                    )) : (
                      <div style={{ color: 'var(--color-ink-3)', fontSize: '13px' }}>No collaboration models specified.</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="admin-controls">
              <div className="admin-search-wrapper">
                <Search size={18} className="admin-search-icon" />
                <input
                  type="text"
                  placeholder="Search by name, email, platform or niche..."
                  className="admin-search-input"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="admin-filter-group">
                <select
                  className="admin-filter-select"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  className="admin-filter-select"
                  value={platformFilter}
                  onChange={e => setPlatformFilter(e.target.value)}
                >
                  <option value="all">All Platforms</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
            </div>

            {/* Collaboration Requests Table */}
            <div className="admin-table-wrapper">
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Creator Profile</th>
                      <th>Social Niche</th>
                      <th>Channels</th>
                      <th>Status Decision</th>
                      <th>Created Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCollabs.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--color-ink-3)' }}>
                          No collaboration requests found matching the filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredCollabs.map(collab => {
                        const audit = collab.audit
                        const profile = collab.profile
                        const name = profile?.full_name || audit?.name || 'Creator'
                        const email = profile?.email || 'N/A'
                        const isExpanded = !!expandedRows[collab.id]
                        const date = new Date(collab.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })

                        const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

                        return (
                          <React.Fragment key={collab.id}>
                            {/* Main row */}
                            <tr className="main-row" onClick={() => toggleRow(collab.id)}>
                              <td>
                                <div className="admin-user-cell">
                                  {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} alt={name} className="admin-user-avatar" />
                                  ) : (
                                    <div className="admin-user-initials">{initials}</div>
                                  )}
                                  <div>
                                    <div className="admin-user-name">{name}</div>
                                    <div className="admin-user-email">{email}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                                  {audit?.niche || 'N/A'}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--color-ink-3)', textTransform: 'capitalize' }}>
                                  {audit?.platform || 'N/A'}
                                </div>
                              </td>
                              <td>
                                <div className="admin-socials">
                                  <span className={`admin-social-tag ${audit?.ig_connected ? 'connected' : ''}`}>IG</span>
                                  <span className={`admin-social-tag ${audit?.yt_connected ? 'connected' : ''}`}>YT</span>
                                  <span className={`admin-social-tag ${audit?.tt_connected ? 'connected' : ''}`}>TT</span>
                                  <span className={`admin-social-tag ${audit?.li_connected ? 'connected' : ''}`}>LI</span>
                                </div>
                              </td>
                              <td onClick={e => e.stopPropagation()}>
                                <div className={`admin-badge ${collab.status}`}>
                                  <select
                                    className="admin-status-dropdown"
                                    value={collab.status}
                                    onChange={e => handleStatusChange(collab.id, e.target.value as any)}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                  </select>
                                </div>
                              </td>
                              <td>{date}</td>
                              <td>
                                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                              </td>
                            </tr>

                            {/* Expandable details row */}
                            {isExpanded && (
                              <tr className="expanded-row">
                                <td colSpan={6}>
                                  <div className="admin-expanded-content">
                                    <div className="admin-expanded-grid">
                                      
                                      {/* Block 1: Creator Onboarding details */}
                                      <div className="admin-detail-block">
                                        <h4 className="admin-detail-block__title">
                                          <Briefcase size={16} style={{ color: 'var(--color-accent)' }} />
                                          Onboarding Intake Audit
                                        </h4>
                                        <div className="admin-detail-list">
                                          <div className="admin-detail-row">
                                            <span className="admin-detail-label">Creator Name</span>
                                            <span className="admin-detail-value">{audit?.name || name}</span>
                                          </div>
                                          {audit?.profile_link && (
                                            <div className="admin-detail-row">
                                              <span className="admin-detail-label">Platform Profile Link</span>
                                              <a
                                                href={audit.profile_link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="admin-detail-value profile-link"
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                              >
                                                {audit.profile_link}
                                                <ExternalLink size={12} />
                                              </a>
                                            </div>
                                          )}
                                          <div className="admin-detail-row">
                                            <span className="admin-detail-label">Creator Niche</span>
                                            <span className="admin-detail-value">{audit?.niche || 'N/A'}</span>
                                          </div>
                                          <div className="admin-detail-row">
                                            <span className="admin-detail-label">Intake Audit Goals</span>
                                            <span className="admin-detail-value">
                                              {audit?.goals?.join(', ') || 'N/A'}
                                            </span>
                                          </div>
                                          <div className="admin-detail-row">
                                            <span className="admin-detail-label">Biggest Problems faced</span>
                                            <span className="admin-detail-value">
                                              {audit?.biggest_problems?.join(', ') || 'N/A'}
                                            </span>
                                          </div>
                                          <div className="admin-detail-row">
                                            <span className="admin-detail-label">How KARA can help</span>
                                            <span className="admin-detail-value">
                                              {audit?.help_needed?.join(', ') || 'N/A'}
                                            </span>
                                          </div>
                                          <div className="admin-detail-row">
                                            <span className="admin-detail-label">Specific Note</span>
                                            <span className="admin-detail-value">{audit?.specific_note || 'None'}</span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Block 2: Collab details */}
                                      <div className="admin-detail-block">
                                        <h4 className="admin-detail-block__title">
                                          <FileText size={16} style={{ color: 'var(--color-accent)' }} />
                                          Collaboration Preferences
                                        </h4>
                                        <div className="admin-detail-list">
                                          <div className="admin-detail-row">
                                            <span className="admin-detail-label">Target Brand Niches</span>
                                            <span className="admin-detail-value">
                                              {collab.brand_types?.join(', ') || 'N/A'}
                                            </span>
                                          </div>
                                          <div className="admin-detail-row">
                                            <span className="admin-detail-label">Collaboration Models</span>
                                            <span className="admin-detail-value">
                                              {collab.collab_types?.join(', ') || 'N/A'}
                                            </span>
                                          </div>
                                          <div className="admin-detail-row">
                                            <span className="admin-detail-label">Comfortable promoting unused items?</span>
                                            <span className="admin-detail-value">{collab.promote_unused || 'N/A'}</span>
                                          </div>
                                          <div className="admin-detail-row">
                                            <span className="admin-detail-label">Contact Method &amp; Details</span>
                                            <span className="admin-detail-value" style={{ textTransform: 'capitalize' }}>
                                              {audit?.contact_type || 'WhatsApp'}: {collab.contact_detail || 'N/A'}
                                            </span>
                                          </div>
                                          <div className="admin-detail-row">
                                            <span className="admin-detail-label">Dream Brands</span>
                                            <span className="admin-detail-value">{collab.dream_brands || 'None'}</span>
                                          </div>
                                        </div>
                                      </div>

                                    </div>

                                    {/* Action buttons */}
                                    <div className="admin-actions-bar">
                                      <button
                                        className="admin-btn admin-btn--secondary"
                                        onClick={() => downloadPDF(collab)}
                                      >
                                        <Download size={14} />
                                        Download PDF Brief
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
