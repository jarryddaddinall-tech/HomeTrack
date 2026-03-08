/**
 * HomeClear static MVP — no backend. Projects: id 1 = hardcoded, id 2 = from localStorage.
 * Login: dropdown of agent/solicitor; sessionStorage holds current user.
 */
(function () {
  var STORAGE_KEY = 'homeclear_projects';
  var USER_KEY = 'homeclear_user';

  /** Options for the login dropdown: { name, role } where role is 'agent' | 'solicitor' | 'seller' | 'buyer' */
  function getLoginUsers() {
    return [
      { name: 'Mary Jane', role: 'agent' },
      { name: 'John Doe', role: 'solicitor' },
      { name: 'James Miller', role: 'agent' },
      { name: 'Tom Lewis', role: 'solicitor' },
      { name: 'Jarryd Pool', role: 'seller' },
      { name: 'Mike Villa', role: 'buyer' }
    ];
  }

  function getCurrentUser() {
    try {
      var raw = sessionStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    try {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearCurrentUser() {
    try {
      sessionStorage.removeItem(USER_KEY);
    } catch (e) {}
  }

  /** Call on protected pages; redirects to login if not signed in. */
  function requireAuth() {
    if (!getCurrentUser()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }

  /** Call on login/register page; redirect to dashboard or straight to deal if one project. */
  function redirectIfLoggedIn() {
    if (!getCurrentUser()) return false;
    var projects = getProjects();
    if (projects.length === 1) {
      window.location.href = 'project.html?id=' + projects[0].id;
    } else {
      window.location.href = 'dashboard.html';
    }
    return true;
  }

  /** Get initials from name (e.g. "James Miller" -> "JM", "Mary" -> "MA"). */
  function getInitials(name) {
    if (!name || !name.trim()) return '?';
    var parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  var ROLE_LABELS = { agent: 'Agent', solicitor: 'Solicitor', seller: 'Seller', buyer: 'Buyer' };

  /**
   * Render the nav user area: circular avatar (initials) + dropdown on click.
   * Call from protected pages; pass the container element (e.g. #nav-user).
   */
  function renderNavUser(containerEl) {
    var user = getCurrentUser();
    if (!user || !containerEl) return;
    var roleLabel = ROLE_LABELS[user.role] || user.role;
    var initials = getInitials(user.name);

    containerEl.innerHTML =
      '<div class="nav-user-wrap" id="nav-user-wrap">' +
        '<button type="button" class="nav-user-avatar" id="nav-user-avatar" aria-haspopup="true" aria-expanded="false" aria-label="User menu">' + initials + '</button>' +
        '<div class="nav-user-dropdown" id="nav-user-dropdown" role="menu" hidden>' +
          '<div class="nav-user-dropdown-header">' +
            '<span class="nav-user-dropdown-name">' + (function escape(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; })(user.name) + '</span>' +
            '<span class="nav-user-dropdown-role ' + user.role + '">' + (function escape(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; })(roleLabel) + '</span>' +
          '</div>' +
          '<a href="index.html" class="nav-user-dropdown-item" id="nav-sign-out" role="menuitem">Sign out</a>' +
        '</div>' +
      '</div>';

    var wrap = document.getElementById('nav-user-wrap');
    var avatar = document.getElementById('nav-user-avatar');
    var dropdown = document.getElementById('nav-user-dropdown');
    var signOut = document.getElementById('nav-sign-out');

    function open() {
      wrap.classList.add('is-open');
      dropdown.hidden = false;
      avatar.setAttribute('aria-expanded', 'true');
    }
    function close() {
      wrap.classList.remove('is-open');
      dropdown.hidden = true;
      avatar.setAttribute('aria-expanded', 'false');
    }

    avatar.addEventListener('click', function (e) {
      e.stopPropagation();
      if (wrap.classList.contains('is-open')) close(); else open();
    });

    signOut.addEventListener('click', function (e) {
      e.preventDefault();
      clearCurrentUser();
      window.location.href = 'index.html';
    });

    document.addEventListener('click', function (e) {
      if (wrap.classList.contains('is-open') && !wrap.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  function getDefaultProject() {
    return {
      id: 1,
      address: '12 Elm Grove, SE22 8PT',
      salePrice: '£485,000',
      sellerName: 'Jarryd Pool',
      buyerName: 'Mike Villa',
      agentName: 'James Miller',
      solicitorName: 'Tom Lewis',
      status: 'On track',
      currentStage: 'Searches & Survey',
      estimatedCompletion: '11 Apr 2025'
    };
  }

  function getCreatedProject() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setCreatedProject(project) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Returns list of projects to show on index: [default, created] (created only if exists).
   */
  function getProjects() {
    var list = [getDefaultProject()];
    var created = getCreatedProject();
    if (created && created.id === 2) {
      list.push(created);
    }
    return list;
  }

  /**
   * Get a single project by id (1 = default, 2 = from localStorage).
   */
  function getProjectById(id) {
    var num = parseInt(id, 10);
    if (num === 1) return getDefaultProject();
    if (num === 2) return getCreatedProject();
    return null;
  }

  /**
   * Standard tasks for a UK residential sale (conveyancing timeline).
   * Each: { label, detail, done, completedDate?, estimatedDate? }.
   */
  function getSaleTasks(projectId) {
    var id = parseInt(projectId, 10);
    var atSearches = (id === 1);
    return [
      { label: 'Offer accepted', detail: 'Sale agreed between parties', done: true, completedDate: '14 Feb 2025' },
      { label: 'Solicitor instructed', detail: 'Seller and buyer instruct conveyancers', done: true, completedDate: '18 Feb 2025' },
      { label: 'ID and proof of address', detail: 'Seller provides ID to solicitor', done: true, completedDate: '20 Feb 2025' },
      { label: 'TA6 Property Information Form', detail: 'Seller completes and returns TA6', done: atSearches, completedDate: atSearches ? '24 Feb 2025' : null, estimatedDate: atSearches ? null : '~1 Mar 2025' },
      { label: 'TA10 Fixtures and Contents Form', detail: 'Seller completes and returns TA10', done: atSearches, completedDate: atSearches ? '24 Feb 2025' : null, estimatedDate: atSearches ? null : '~1 Mar 2025' },
      { label: 'Contract pack sent', detail: 'Seller\'s solicitor sends draft contract pack to buyer', done: atSearches, completedDate: atSearches ? '25 Feb 2025' : null, estimatedDate: atSearches ? null : '~2 Mar 2025' },
      { label: 'Local search ordered', detail: 'Buyer\'s solicitor orders local authority search', done: atSearches, completedDate: atSearches ? '26 Feb 2025' : null, estimatedDate: atSearches ? null : '~3 Mar 2025' },
      { label: 'Drainage search ordered', detail: 'Drainage and water search', done: atSearches, completedDate: atSearches ? '26 Feb 2025' : null, estimatedDate: atSearches ? null : '~3 Mar 2025' },
      { label: 'Searches received and reviewed', detail: 'Enquiries raised if needed', done: false, estimatedDate: '~5 Mar 2025' },
      { label: 'Enquiries answered', detail: 'Seller\'s solicitor responds to enquiries', done: false, estimatedDate: '~12 Mar 2025' },
      { label: 'Mortgage offer (buyer)', detail: 'Buyer\'s mortgage offer in place', done: false, estimatedDate: '~5 Mar 2025' },
      { label: 'Exchange of contracts', detail: 'Contracts exchanged; sale legally binding', done: false, estimatedDate: '~28 Mar 2025' },
      { label: 'Completion', detail: 'Keys handed over; funds transferred', done: false, estimatedDate: '11 Apr 2025' }
    ];
  }

  /**
   * Standard documents for a UK residential sale (seller side).
   * Each: { label, detail, received, completedDate?, estimatedDate?, docKey? } — docKey for mock preview.
   */
  function getSaleDocuments(projectId) {
    var id = parseInt(projectId, 10);
    var atSearches = (id === 1);
    return [
      { label: 'TA6 Property Information Form', detail: 'Law Society form; boundaries, disputes, work done', received: atSearches, completedDate: atSearches ? '24 Feb 2025' : null, estimatedDate: atSearches ? null : '~1 Mar', docKey: 'ta6' },
      { label: 'TA10 Fixtures and Contents Form', detail: 'What is included/excluded in the sale', received: atSearches, completedDate: atSearches ? '24 Feb 2025' : null, estimatedDate: atSearches ? null : '~1 Mar', docKey: 'ta10' },
      { label: 'Proof of ID', detail: 'Passport or driving licence', received: true, completedDate: '20 Feb 2025' },
      { label: 'Proof of address', detail: 'Utility bill or bank statement', received: true, completedDate: '20 Feb 2025' },
      { label: 'Title deeds / Land Registry', detail: 'Official copies proving ownership', received: true, completedDate: '21 Feb 2025' },
      { label: 'Energy Performance Certificate (EPC)', detail: 'Required before marketing', received: true, completedDate: '10 Feb 2025' },
      { label: 'Planning and Building Regs', detail: 'If extension or alterations', received: false, estimatedDate: '—' },
      { label: 'FENSA / window certificates', detail: 'If windows replaced', received: false, estimatedDate: '—' },
      { label: 'Gas Safe certificate', detail: 'Gas safety record if applicable', received: false, estimatedDate: '—' },
      { label: 'Electrical certificate', detail: 'EIC or EICR if applicable', received: false, estimatedDate: '—' },
      { label: 'Warranties and guarantees', detail: 'NHBC, damp proof, etc.', received: false, estimatedDate: '—' }
    ];
  }

  /**
   * Mock document content for preview modal. docKey from getSaleDocuments.
   */
  function getMockDocumentContent(docKey) {
    var docs = {
      ta6: {
        title: 'TA6 — Property Information Form (6th edition)',
        body: 'Property: 12 Elm Grove, SE22 8PT\n\nThis form is completed by the seller to provide information about the property to the buyer.\n\n1. Boundaries: The seller confirms that the boundaries are as indicated on the title plan.\n\n2. Disputes: None.\n\n3. Notices: None affecting the property.\n\n4. Alterations and planning: Kitchen extension completed 2019, building regulations approved.\n\n5. Guarantees: FENSA certificate for double glazing (2018).\n\n[... remainder of form ...]\n\nSigned: Jarryd Pool\nDate: 24 February 2025'
      },
      ta10: {
        title: 'TA10 — Fittings and Contents Form',
        body: 'Property: 12 Elm Grove, SE22 8PT\n\nItems included in the sale:\n- Fitted kitchen units and worktops\n- Integrated oven, hob, extractor\n- Fitted wardrobes in main bedroom\n- Garden shed\n- Curtains and curtain rails\n\nItems excluded:\n- Freestanding fridge-freezer\n- Dining table and chairs\n\n[...]\n\nSigned: Jarryd Pool\nDate: 24 February 2025'
      }
    };
    return docs[docKey] || { title: 'Document', body: 'No preview available.' };
  }

  /**
   * Mock messages between agent and solicitor for this deal.
   * Each: { from: 'agent'|'solicitor', name, text, date }.
   */
  function getSaleMessages(projectId) {
    return [
      { from: 'solicitor', name: 'Tom Lewis', text: 'Hi James — contract pack should be with you by end of week. Can you chase the TA6 from the seller?', date: '22 Feb 2025, 10:32' },
      { from: 'agent', name: 'James Miller', text: 'Will do. I\'ve reminded Jarryd; he\'s aiming to return it by Friday.', date: '22 Feb 2025, 11:05' },
      { from: 'solicitor', name: 'Tom Lewis', text: 'Thanks. Survey is booked for 28th — buyer\'s solicitor will send report early March.', date: '24 Feb 2025, 09:15' },
      { from: 'agent', name: 'James Miller', text: 'TA6 and TA10 received from seller this morning. Forwarding to you now.', date: '24 Feb 2025, 14:22' },
      { from: 'solicitor', name: 'Tom Lewis', text: 'Received, thanks. Searches ordered. I\'ll update once we have results.', date: '26 Feb 2025, 16:00' }
    ];
  }

  window.HomeClear = {
    getProjects: getProjects,
    getProjectById: getProjectById,
    getCreatedProject: getCreatedProject,
    setCreatedProject: setCreatedProject,
    getDefaultProject: getDefaultProject,
    getSaleTasks: getSaleTasks,
    getSaleDocuments: getSaleDocuments,
    getMockDocumentContent: getMockDocumentContent,
    getSaleMessages: getSaleMessages,
    getLoginUsers: getLoginUsers,
    getCurrentUser: getCurrentUser,
    setCurrentUser: setCurrentUser,
    clearCurrentUser: clearCurrentUser,
    requireAuth: requireAuth,
    redirectIfLoggedIn: redirectIfLoggedIn,
    getInitials: getInitials,
    ROLE_LABELS: ROLE_LABELS,
    renderNavUser: renderNavUser
  };
})();
