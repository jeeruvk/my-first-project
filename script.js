// script.js
class IssueTracker {
    constructor() {
        this.issues = [
            {
                id: 'REQ-001',
                type: 'Requirement',
                title: 'Add Dark Mode Support',
                description: 'Implement dark mode theme for better user experience',
                status: 'Open',
                priority: 'High',
                reporter: 'John Doe',
                department: 'IT',
                location: 'Hyderabad',
                createdDate: new Date('2024-01-15'),
                pageUrl: '/dashboard'
            },
            {
                id: 'MOD-002',
                type: 'Modification',
                title: 'Update Navigation Menu',
                description: 'Redesign the main navigation to be more intuitive',
                status: 'In Progress',
                priority: 'Medium',
                reporter: 'Jane Smith',
                department: 'Marketing',
                location: 'Mumbai',
                createdDate: new Date('2024-01-14'),
                pageUrl: '/navigation'
            },
            {
                id: 'BUG-003',
                type: 'Bug',
                title: 'Login Form Validation Error',
                description: 'Form validation not working properly on mobile devices',
                status: 'Resolved',
                priority: 'Critical',
                reporter: 'Mike Johnson',
                department: 'IT',
                location: 'Delhi',
                createdDate: new Date('2024-01-13'),
                pageUrl: '/login'
            }
        ];

        this.activities = [
            {
                type: 'Issue Created',
                description: 'New requirement for dark mode support',
                issueType: 'Requirement',
                userName: 'John Doe',
                time: '2 hours ago'
            },
            {
                type: 'Status Updated',
                description: 'Navigation menu modification moved to In Progress',
                issueType: 'Modification',
                userName: 'System',
                time: '4 hours ago'
            },
            {
                type: 'Issue Resolved',
                description: 'Login form validation bug has been fixed',
                issueType: 'Bug',
                userName: 'Mike Johnson',
                time: '1 day ago'
            }
        ];

        this.init();
    }

    init() {
        this.loadRecentIssues();
        this.loadRecentActivity();
        this.loadAllIssues();
        this.updateStatistics();
        this.initializeCharts();
    }

    loadRecentIssues() {
        const container = document.getElementById('recentIssuesContainer');
        const recentIssues = this.issues.slice(0, 5);
        
        container.innerHTML = recentIssues.map(issue => `
            <div class="issue-card">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div class="d-flex align-items-center gap-2">
                        <span class="badge badge-${this.getIssueTypeClass(issue.type)}">${issue.type}</span>
                        <small class="text-muted font-monospace">${issue.id}</small>
                    </div>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary btn-sm" onclick="issueTracker.viewIssue('${issue.id}')" title="View Issue">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" onclick="issueTracker.editIssue('${issue.id}')" title="Edit Issue">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
                <h6 class="fw-bold mb-2">${issue.title}</h6>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-3">
                        <span class="badge badge-${this.getStatusClass(issue.status)}">
                            <i class="fas ${this.getStatusIcon(issue.status)} me-1"></i>
                            ${issue.status}
                        </span>
                        <span class="badge bg-light text-dark">${issue.priority}</span>
                        <small class="text-muted">${issue.department}</small>
                    </div>
                    <div class="text-end">
                        <div class="fw-medium small">${issue.reporter}</div>
                        <div class="text-muted small">${this.formatDate(issue.createdDate)}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadRecentActivity() {
        const container = document.getElementById('recentActivityContainer');
        
        container.innerHTML = this.activities.map(activity => `
            <div class="activity-item">
                <div class="d-flex align-items-start gap-3">
                    <div class="activity-icon bg-light">
                        <i class="fas ${this.getActivityIcon(activity.type)}"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start mb-1">
                            <small class="fw-medium">${activity.type}</small>
                            <span class="badge badge-${this.getIssueTypeClass(activity.issueType)} small">
                                ${activity.issueType}
                            </span>
                        </div>
                        <p class="small text-muted mb-1">${activity.description}</p>
                        <div class="d-flex align-items-center gap-2 small text-muted">
                            <span>${activity.userName}</span>
                            <span>•</span>
                            <span>${activity.time}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadAllIssues() {
        const tbody = document.getElementById('issuesTableBody');
        
        tbody.innerHTML = this.issues.map(issue => `
            <tr>
                <td class="font-monospace small">${issue.id}</td>
                <td>
                    <span class="badge badge-${this.getIssueTypeClass(issue.type)}">${issue.type}</span>
                </td>
                <td class="fw-medium">${issue.title}</td>
                <td>
                    <span class="badge badge-${this.getStatusClass(issue.status)}">
                        <i class="fas ${this.getStatusIcon(issue.status)} me-1"></i>
                        ${issue.status}
                    </span>
                </td>
                <td>
                    <span class="badge ${this.getPriorityClass(issue.priority)}">${issue.priority}</span>
                </td>
                <td>${issue.reporter}</td>
                <td>${issue.department}</td>
                <td>${this.formatDate(issue.createdDate)}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary btn-sm" onclick="issueTracker.viewIssue('${issue.id}')" title="View Issue">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" onclick="issueTracker.editIssue('${issue.id}')" title="Edit Issue">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="issueTracker.deleteIssue('${issue.id}')" title="Delete Issue">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    updateStatistics() {
        const totalIssues = this.issues.length;
        const openIssues = this.issues.filter(issue => issue.status === 'Open').length;
        const inProgressIssues = this.issues.filter(issue => issue.status === 'In Progress').length;
        const resolvedIssues = this.issues.filter(issue => issue.status === 'Resolved').length;

        document.getElementById('totalIssues').textContent = totalIssues;
        document.getElementById('openIssues').textContent = openIssues;
        document.getElementById('inProgressIssues').textContent = inProgressIssues;
        document.getElementById('resolvedIssues').textContent = resolvedIssues;

        // Update report statistics
        const requirements = this.issues.filter(issue => issue.type === 'Requirement').length;
        const modifications = this.issues.filter(issue => issue.type === 'Modification').length;
        const bugs = this.issues.filter(issue => issue.type === 'Bug').length;

        document.getElementById('totalRequirements').textContent = requirements;
        document.getElementById('totalModifications').textContent = modifications;
        document.getElementById('totalBugs').textContent = bugs;
        document.getElementById('resolutionRate').textContent = Math.round((resolvedIssues / totalIssues) * 100) + '%';
    }

    getIssueTypeClass(type) {
        const classes = {
            'Requirement': 'requirement',
            'Modification': 'modification',
            'Bug': 'bug'
        };
        return classes[type] || 'primary';
    }

    getStatusClass(status) {
        const classes = {
            'Open': 'open',
            'In Progress': 'progress',
            'Resolved': 'resolved'
        };
        return classes[status] || 'secondary';
    }

    getStatusIcon(status) {
        const icons = {
            'Open': 'fa-exclamation-circle',
            'In Progress': 'fa-clock',
            'Resolved': 'fa-check-circle'
        };
        return icons[status] || 'fa-circle';
    }

    getPriorityClass(priority) {
        const classes = {
            'Critical': 'bg-danger text-white',
            'High': 'bg-warning text-dark',
            'Medium': 'bg-info text-dark',
            'Low': 'bg-success text-white'
        };
        return classes[priority] || 'bg-secondary text-white';
    }

    getActivityIcon(type) {
        const icons = {
            'Issue Created': 'fa-plus',
            'Status Updated': 'fa-edit',
            'Issue Resolved': 'fa-check',
            'Comment Added': 'fa-comment'
        };
        return icons[type] || 'fa-circle';
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    generateIssueId(type) {
        const prefix = {
            'Requirement': 'REQ',
            'Modification': 'MOD',
            'Bug': 'BUG'
        };
        const count = this.issues.filter(issue => issue.type === type).length + 1;
        return `${prefix[type]}-${count.toString().padStart(3, '0')}`;
    }

    submitIssue() {
        const form = document.getElementById('issueForm');
        const formData = new FormData(form);
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const isEdit = formData.get('isEdit') === 'true';
        const issueData = {
            id: isEdit ? formData.get('issueId') : this.generateIssueId(formData.get('issueType')),
            type: formData.get('issueType'),
            title: formData.get('title'),
            description: formData.get('description'),
            priority: formData.get('priority'),
            department: formData.get('department'),
            location: formData.get('location'),
            reporter: formData.get('reporter'),
            pageUrl: formData.get('pageUrl'),
            status: isEdit ? formData.get('status') : 'Open',
            createdDate: isEdit ? this.issues.find(i => i.id === formData.get('issueId')).createdDate : new Date()
        };

        if (isEdit) {
            const index = this.issues.findIndex(issue => issue.id === issueData.id);
            this.issues[index] = issueData;
        } else {
            this.issues.unshift(issueData);
        }

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('newIssueModal'));
        modal.hide();

        // Show success popup
        this.showSuccessPopup(issueData.type, issueData.id, isEdit);

        // Refresh data
        this.refreshData();
    }

    viewIssue(issueId) {
        const issue = this.issues.find(i => i.id === issueId);
        if (!issue) return;

        const content = document.getElementById('viewIssueContent');
        content.innerHTML = `
            <div class="row mb-3">
                <div class="col-md-6">
                    <strong>Issue ID:</strong>
                    <p class="font-monospace">${issue.id}</p>
                </div>
                <div class="col-md-6">
                    <strong>Issue Type:</strong>
                    <p><span class="badge badge-${this.getIssueTypeClass(issue.type)}">${issue.type}</span></p>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <strong>Priority:</strong>
                    <p><span class="badge ${this.getPriorityClass(issue.priority)}">${issue.priority}</span></p>
                </div>
                <div class="col-md-6">
                    <strong>Status:</strong>
                    <p><span class="badge badge-${this.getStatusClass(issue.status)}">${issue.status}</span></p>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <strong>Department:</strong>
                    <p>${issue.department}</p>
                </div>
                <div class="col-md-6">
                    <strong>Location:</strong>
                    <p>${issue.location}</p>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <strong>Reporter:</strong>
                    <p>${issue.reporter}</p>
                </div>
                <div class="col-md-6">
                    <strong>Created Date:</strong>
                    <p>${this.formatDate(issue.createdDate)}</p>
                </div>
            </div>
            <div class="mb-3">
                <strong>Subject:</strong>
                <p>${issue.title}</p>
            </div>
            <div class="mb-3">
                <strong>Description:</strong>
                <p>${issue.description}</p>
            </div>
            ${issue.pageUrl ? `
                <div class="mb-3">
                    <strong>Page URL:</strong>
                    <p><a href="${issue.pageUrl}" target="_blank">${issue.pageUrl}</a></p>
                </div>
            ` : ''}
        `;

        const modal = new bootstrap.Modal(document.getElementById('viewIssueModal'));
        modal.show();
    }

    editIssue(issueId) {
        const issue = this.issues.find(i => i.id === issueId);
        if (!issue) return;

        // Populate form with issue data
        document.getElementById('issueType').value = issue.type;
        document.getElementById('issueId').value = issue.id;
        document.getElementById('isEdit').value = 'true';
        document.getElementById('priority').value = issue.priority;
        document.getElementById('department').value = issue.department;
        document.getElementById('location').value = issue.location;
        document.getElementById('reporter').value = issue.reporter;
        document.getElementById('pageUrl').value = issue.pageUrl || '';
        document.getElementById('title').value = issue.title;
        document.getElementById('description').value = issue.description;
        document.getElementById('status').value = issue.status;

        // Update modal
        document.getElementById('newIssueModalLabel').textContent = 'Edit Issue';
        document.getElementById('modalDescription').textContent = 'Update issue information';
        
        const modalIcon = document.getElementById('modalIcon');
        modalIcon.className = 'action-icon warning';
        modalIcon.innerHTML = '<i class="fas fa-edit"></i>';

        // Show/hide elements for edit
        document.getElementById('statusRow').style.display = 'flex';
        document.getElementById('fileUploadSection').style.display = 'none';
        document.getElementById('submitIssueBtn').textContent = 'Update Issue';

        const modal = new bootstrap.Modal(document.getElementById('newIssueModal'));
        modal.show();
    }

    deleteIssue(issueId) {
        if (confirm('Are you sure you want to delete this issue?')) {
            this.issues = this.issues.filter(issue => issue.id !== issueId);
            this.refreshData();
            this.showNotification('Issue deleted successfully', 'success');
        }
    }

    showSuccessPopup(issueType, issueId, isEdit = false) {
        const overlay = document.createElement('div');
        overlay.className = 'success-popup-overlay';
        
        const popup = document.createElement('div');
        popup.className = 'success-popup';
        
        const iconConfig = {
            'Requirement': { icon: 'fa-plus', color: 'success', message: 'Requirement' },
            'Modification': { icon: 'fa-edit', color: 'warning', message: 'Modification Request' },
            'Bug': { icon: 'fa-bug', color: 'danger', message: 'Bug Report' }
        };
        
        const config = iconConfig[issueType] || { icon: 'fa-check', color: 'success', message: 'Issue' };
        const actionText = isEdit ? 'Updated' : 'Created';
        
        popup.innerHTML = `
            <div class="success-icon ${config.color}">
                <i class="fas ${config.icon}"></i>
            </div>
            <h4 class="fw-bold mb-2">${config.message} Successfully ${actionText}!</h4>
            <p class="text-muted mb-3">Issue ID: <strong class="font-monospace">${issueId}</strong></p>
            <p class="small text-muted mb-4">Your ${issueType.toLowerCase()} has been ${isEdit ? 'updated' : 'submitted'} and ${isEdit ? 'saved' : 'assigned a tracking number'}. You will receive updates on the progress.</p>
            <button type="button" class="btn btn-primary" onclick="issueTracker.closeSuccessPopup()">Continue</button>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        
        // Auto close after 5 seconds
        setTimeout(() => {
            this.closeSuccessPopup();
        }, 5000);
    }

    closeSuccessPopup() {
        const overlay = document.querySelector('.success-popup-overlay');
        const popup = document.querySelector('.success-popup');
        
        if (overlay) overlay.remove();
        if (popup) popup.remove();
    }

    refreshData() {
        this.loadRecentIssues();
        this.loadRecentActivity();
        this.loadAllIssues();
        this.updateStatistics();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    initializeCharts() {
        // This would typically initialize Chart.js charts
        // For now, we'll just set up the canvas elements
        setTimeout(() => {
            if (document.getElementById('issueTypeChart')) {
                this.createIssueTypeChart();
            }
            if (document.getElementById('monthlyTrendChart')) {
                this.createMonthlyTrendChart();
            }
        }, 100);
    }

    createIssueTypeChart() {
        const ctx = document.getElementById('issueTypeChart');
        if (!ctx) return;

        const requirements = this.issues.filter(issue => issue.type === 'Requirement').length;
        const modifications = this.issues.filter(issue => issue.type === 'Modification').length;
        const bugs = this.issues.filter(issue => issue.type === 'Bug').length;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Requirements', 'Modifications', 'Bug Reports'],
                datasets: [{
                    data: [requirements, modifications, bugs],
                    backgroundColor: [
                        'rgba(5, 150, 105, 0.8)',
                        'rgba(217, 119, 6, 0.8)',
                        'rgba(220, 38, 38, 0.8)'
                    ],
                    borderColor: [
                        'rgb(5, 150, 105)',
                        'rgb(217, 119, 6)',
                        'rgb(220, 38, 38)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createMonthlyTrendChart() {
        const ctx = document.getElementById('monthlyTrendChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Issues Created',
                    data: [12, 19, 15, 25, 22, 30],
                    borderColor: 'rgb(37, 99, 235)',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Global functions for modal interactions
function showNewIssueModal(issueType, title, description, iconClass, iconColor) {
    clearModalForm();
    
    document.getElementById('issueType').value = issueType;
    document.getElementById('isEdit').value = 'false';
    document.getElementById('issueId').value = '';
    
    document.getElementById('newIssueModalLabel').textContent = title;
    document.getElementById('modalDescription').textContent = description;

    const modalIcon = document.getElementById('modalIcon');
    modalIcon.className = 'action-icon ' + iconColor;
    modalIcon.innerHTML = '<i class="fas ' + iconClass + '"></i>';

    // Show/hide elements for new issue
    document.getElementById('statusRow').style.display = 'none';
    document.getElementById('fileUploadSection').style.display = 'block';
    document.getElementById('submitIssueBtn').textContent = 'Submit Issue';

    const modal = new bootstrap.Modal(document.getElementById('newIssueModal'));
    modal.show();
}

function showReportAnalysisModal() {
    issueTracker.initializeCharts();
    const modal = new bootstrap.Modal(document.getElementById('reportAnalysisModal'));
    modal.show();
}

function clearModalForm() {
    const form = document.getElementById('issueForm');
    form.reset();
    document.getElementById('reporter').disabled = false;
}

function submitIssue() {
    issueTracker.submitIssue();
}

function filterIssues() {
    issueTracker.showNotification('Filter functionality would be implemented here', 'info');
}

function searchIssues() {
    issueTracker.showNotification('Search functionality would be implemented here', 'info');
}

function exportIssues() {
    issueTracker.showNotification('Export functionality would be implemented here', 'info');
}

function exportReport() {
    issueTracker.showNotification('Report export functionality would be implemented here', 'info');
}

// Initialize the application
let issueTracker;
document.addEventListener('DOMContentLoaded', function() {
    issueTracker = new IssueTracker();
});
