            function showNewIssueModal(issueType, title, description, iconClass, iconColor) {
                // Clear form first
                clearModalForm();
                
                document.getElementById('<%= hfIssueType.ClientID %>').value = issueType;
                document.getElementById('<%= hfIsEdit.ClientID %>').value = 'false';
                document.getElementById('<%= hfIssueID.ClientID %>').value = '';
                
                document.getElementById('newIssueModalLabel').textContent = title;
                document.getElementById('modalDescription').textContent = description;

                var modalIcon = document.getElementById('modalIcon');
                modalIcon.className = 'action-icon ' + iconColor;
                modalIcon.innerHTML = '<i class="fas ' + iconClass + '"></i>';

                // Show/hide elements for new issue
                var statusRow = document.getElementById('<%= statusRow.ClientID %>');
                if (statusRow) statusRow.style.display = 'none';
                
                var fileUploadSection = document.getElementById('<%= fileUploadSection.ClientID %>');
                if (fileUploadSection) fileUploadSection.style.display = 'block';
                
                document.getElementById('<%= btnSubmitIssue.ClientID %>').innerText = 'Submit Issue';

                var modal = new bootstrap.Modal(document.getElementById('newIssueModal'));
                modal.show();
            }

            function showEditIssueModal(issueId) {
                document.getElementById('<%= hfIsEdit.ClientID %>').value = 'true';
                document.getElementById('<%= hfIssueID.ClientID %>').value = issueId;
                
                document.getElementById('newIssueModalLabel').textContent = 'Edit Issue';
                document.getElementById('modalDescription').textContent = 'Update issue information';

                var modalIcon = document.getElementById('modalIcon');
                modalIcon.className = 'action-icon warning';
                modalIcon.innerHTML = '<i class="fas fa-edit"></i>';

                // Show/hide elements for edit
                var statusRow = document.getElementById('<%= statusRow.ClientID %>');
                if (statusRow) statusRow.style.display = 'flex';
                
                var fileUploadSection = document.getElementById('<%= fileUploadSection.ClientID %>');
                if (fileUploadSection) fileUploadSection.style.display = 'none';
                
                document.getElementById('<%= btnSubmitIssue.ClientID %>').innerText = 'Update Issue';

                var modal = new bootstrap.Modal(document.getElementById('newIssueModal'));
                modal.show();
            }

            function showViewIssueModal() {
                var modal = new bootstrap.Modal(document.getElementById('viewIssueModal'));
                modal.show();
            }

            function showReportAnalysisModal() {
                var modal = new bootstrap.Modal(document.getElementById('reportAnalysisModal'));
                modal.show();
            }

            function clearModalForm() {
                // Clear all form fields
                document.getElementById('<%= ddlPriority.ClientID %>').selectedIndex = 0;
                document.getElementById('<%= ddlDepartment.ClientID %>').selectedIndex = 0;
                document.getElementById('<%= ddlLocation.ClientID %>').selectedIndex = 0;
                document.getElementById('<%= txtReporter.ClientID %>').value = '';
                document.getElementById('<%= txtPageUrl.ClientID %>').value = '';
                document.getElementById('<%= txtTitle.ClientID %>').value = '';
                document.getElementById('<%= txtDescription.ClientID %>').value = '';
                
                // Enable reporter field
                document.getElementById('<%= txtReporter.ClientID %>').disabled = false;
            }

            function showSuccessPopup(issueType, issueId) {
                var overlay = document.createElement('div');
                overlay.className = 'success-popup-overlay';
                
                var popup = document.createElement('div');
                popup.className = 'success-popup';
                
                var iconClass = '';
                var iconColor = '';
                var message = '';
                
                switch(issueType.toLowerCase()) {
                    case 'requirement':
                        iconClass = 'fa-plus';
                        iconColor = 'success';
                        message = 'New Requirement Successfully Created!';
                        break;
                    case 'modification':
                        iconClass = 'fa-edit';
                        iconColor = 'warning';
                        message = 'Modification Request Successfully Created!';
                        break;
                    case 'bug':
                        iconClass = 'fa-bug';
                        iconColor = 'danger';
                        message = 'Bug Report Successfully Created!';
                        break;
                    default:
                        iconClass = 'fa-check';
                        iconColor = 'success';
                        message = 'Issue Successfully Created!';
                }
                
                popup.innerHTML = `
                    <div class="success-icon ${iconColor}">
                        <i class="fas ${iconClass}"></i>
                    </div>
                    <h4 class="fw-bold mb-2">${message}</h4>
                    <p class="text-muted mb-3">Issue ID: <strong>${issueId}</strong></p>
                    <p class="small text-muted mb-4">Your ${issueType.toLowerCase()} has been submitted and assigned a tracking number. You will receive updates on the progress.</p>
                    <button type="button" class="btn btn-primary" onclick="closeSuccessPopup()">Continue</button>
                `;
                
                document.body.appendChild(overlay);
                document.body.appendChild(popup);
                
                // Auto close after 5 seconds
                setTimeout(function() {
                    closeSuccessPopup();
                }, 5000);
            }

            function closeSuccessPopup() {
                var overlay = document.querySelector('.success-popup-overlay');
                var popup = document.querySelector('.success-popup');
                
                if (overlay) overlay.remove();
                if (popup) popup.remove();
                
                // Reload page to refresh data
                location.reload();
            }

            // Ensure modals work properly with UpdatePanels
            function pageLoad() {
                // Re-initialize Bootstrap components after partial postback
                var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl);
                });
            }
