document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    // The theme toggle and its related elements are removed as requested.
    const body = document.body;

    const sidebar = document.querySelector('.sidebar');
    const listContainer = document.getElementById('list-container');
    const addListButton = document.getElementById('add-list-button');

    const searchInput = document.getElementById('search-input');
    const filterStatusSelect = document.getElementById('filter-status');
    const sortBySelect = document.getElementById('sort-by');
    const taskListDiv = document.getElementById('task-list');
    const noTasksMessage = document.getElementById('no-tasks-message');

    const addTaskBtn = document.getElementById('add-task-btn');
    const taskModal = document.getElementById('task-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalTitle = document.getElementById('modal-title');
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescriptionInput = document.getElementById('task-description');
    const taskDueDateInput = document.getElementById('task-due-date');
    const taskDueTimeInput = document = document.getElementById('task-due-time');
    const taskPrioritySelect = document.getElementById('task-priority');
    const taskListSelect = document.getElementById('task-list-select');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    // --- State Variables ---
    let tasks = [];
    let lists = ['All Tasks', 'Work', 'Personal', 'Shopping', 'Academics', 'Health', 'Finance', 'Home Chores', 'Creative Projects'];
    let activeList = 'All Tasks';
    let editingTaskId = null;

    // --- Local Storage / Data Initialization ---
    const loadTasks = () => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            // In a real app, you might want to validate/reformat dates here
        } else {
            // Sample tasks if local storage is empty, with 5 NEW ones for a total of 25
            tasks = [
                { id: '1', title: 'Buy groceries', description: 'Milk, Eggs, Bread, Fruits, Vegetables', dueDate: '2025-07-05', dueTime: '18:00', priority: 'high', list: 'Shopping', completed: false, createdAt: '2025-06-30T10:00:00Z' },
                { id: '2', title: 'Finish Q2 Report', description: 'Complete financial report and presentation slides for leadership meeting.', dueDate: '2025-07-03', dueTime: '10:00', priority: 'high', list: 'Work', completed: false, createdAt: '2025-06-29T14:30:00Z' },
                { id: '3', title: 'Call Mom', description: 'Wish happy birthday and catch up on family news.', dueDate: '2025-07-01', dueTime: '19:30', priority: 'medium', list: 'Personal', completed: false, createdAt: '2025-06-28T09:00:00Z' },
                { id: '4', title: 'Workout - Leg Day', description: 'Gym session: squats, lunges, deadlifts.', dueDate: '2025-07-02', dueTime: '07:00', priority: 'low', list: 'Health', completed: true, createdAt: '2025-06-27T08:00:00Z' },
                { id: '5', title: 'Study for Math Exam', description: 'Review chapters 1-5, focus on calculus problems and theorems.', dueDate: '2025-07-10', dueTime: '09:00', priority: 'high', list: 'Academics', completed: false, createdAt: '2025-07-01T10:00:00Z' },
                { id: '6', title: 'Read "The Great Gatsby"', description: 'Chapters 1-3 for literature class discussion tomorrow.', dueDate: '2025-07-07', dueTime: '20:00', priority: 'medium', list: 'Academics', completed: false, createdAt: '2025-07-01T11:00:00Z' },
                { id: '7', title: 'Complete History Essay', description: 'Research and write 1500 words on the impact of World War II.', dueDate: '2025-07-15', dueTime: '23:59', priority: 'high', list: 'Academics', completed: false, createdAt: '2025-07-01T12:00:00Z' },
                { id: '8', title: 'Physics Lab Report', description: 'Finalize data analysis and conclusions for experiment 3 on thermodynamics.', dueDate: '2025-07-08', dueTime: '17:00', priority: 'medium', list: 'Academics', completed: false, createdAt: '2025-07-01T13:00:00Z' },
                { id: '9', title: 'Group Project Meeting', description: 'Discuss roles and deadlines for the Computer Science capstone project.', dueDate: '2025-07-04', dueTime: '14:00', priority: 'low', list: 'Academics', completed: true, createdAt: '2025-07-01T14:00:00Z' },
                { id: '10', title: 'Pay Electricity Bill', description: 'Due date for this month\'s electricity bill, auto-pay setup.', dueDate: '2025-07-05', dueTime: '16:00', priority: 'medium', list: 'Finance', completed: false, createdAt: '2025-06-25T10:00:00Z' },
                { id: '11', title: 'Schedule Dental Check-up', description: 'Book appointment for routine check-up and cleaning.', dueDate: '2025-07-20', dueTime: '', priority: 'low', list: 'Health', completed: false, createdAt: '2025-06-26T11:00:00Z' },
                { id: '12', title: 'Research New Investment Options', description: 'Look into index funds and real estate investment trusts.', dueDate: '2025-07-31', dueTime: '', priority: 'high', list: 'Finance', completed: false, createdAt: '2025-06-20T15:00:00Z' },
                { id: '13', title: 'Plan Weekend Getaway', description: 'Look for hotels and activities for a short trip to the mountains.', dueDate: '2025-07-12', dueTime: '', priority: 'medium', list: 'Personal', completed: false, createdAt: '2025-07-01T09:00:00Z' },
                { id: '14', title: 'Update Resume', description: 'Add recent project experience and skills.', dueDate: '2025-07-09', dueTime: '17:00', priority: 'medium', list: 'Work', completed: false, createdAt: '2025-07-01T08:00:00Z' },
                { id: '15', title: 'Water Plants', description: 'Remember to water all indoor plants, especially the ferns.', dueDate: '2025-07-02', dueTime: '08:00', priority: 'low', list: 'Personal', completed: false, createdAt: '2025-07-01T07:00:00Z' },
                // --- 5 NEW, DISTINCT TASKS ADDED HERE (Total 20 existing + 5 new = 25) ---
                { id: '16', title: 'Renew Gym Membership', description: 'Check for annual discounts and upgrade options.', dueDate: '2025-07-18', dueTime: '', priority: 'low', list: 'Health', completed: false, createdAt: '2025-07-01T20:00:00Z' },
                { id: '17', title: 'Prepare for Team Standup', description: 'Summarize yesterday\'s progress and today\'s plan.', dueDate: '2025-07-02', dueTime: '09:00', priority: 'medium', list: 'Work', completed: false, createdAt: '2025-07-01T21:00:00Z' },
                { id: '18', title: 'Bake Birthday Cake', description: 'Ingredients: flour, sugar, eggs, chocolate. For friend\'s birthday.', dueDate: '2025-07-04', dueTime: '15:00', priority: 'high', list: 'Personal', completed: false, createdAt: '2025-07-01T22:00:00Z' },
                { id: '19', title: 'Review Chapter 3 Chemistry', description: 'Focus on stoichiometry and chemical reactions.', dueDate: '2025-07-06', dueTime: '11:00', priority: 'high', list: 'Academics', completed: false, createdAt: '2025-07-01T23:00:00Z' },
                { id: '20', title: 'Clean out Fridge', description: 'Discard expired items and wipe down shelves.', dueDate: '2025-07-07', dueTime: '', priority: 'low', list: 'Home Chores', completed: false, createdAt: '2025-07-02T00:00:00Z' },
                { id: '21', title: 'Book Flight Tickets', description: 'For holiday trip to Goa in August.', dueDate: '2025-07-10', dueTime: '', priority: 'high', list: 'Personal', completed: false, createdAt: '2025-07-02T01:00:00Z' },
                { id: '22', title: 'File Tax Documents', description: 'Gather all income and expense receipts for tax season.', dueDate: '2025-07-25', dueTime: '', priority: 'high', list: 'Finance', completed: false, createdAt: '2025-07-02T02:00:00Z' },
                { id: '23', title: 'Research Smart Home Devices', description: 'Look into smart lighting and security cameras.', dueDate: '2025-07-16', dueTime: '', priority: 'medium', list: 'Shopping', completed: false, createdAt: '2025-07-02T03:00:00Z' },
                { id: '24', title: 'Start New Painting', description: 'Sketch initial concept for landscape acrylic painting.', dueDate: '2025-07-09', dueTime: '', priority: 'low', list: 'Creative Projects', completed: false, createdAt: '2025-07-02T04:00:00Z' },
                { id: '25', title: 'Prepare for Client Meeting', description: 'Review presentation deck and discussion points for Project Alpha.', dueDate: '2025-07-03', dueTime: '11:00', priority: 'high', list: 'Work', completed: false, createdAt: '2025-07-02T05:00:00Z' }
            ];
        }
        renderTasks();
    };

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadLists = () => {
        const storedLists = localStorage.getItem('lists');
        if (storedLists) {
            lists = JSON.parse(storedLists);
        }
        renderLists();
    };

    const saveLists = () => {
        localStorage.setItem('lists', JSON.stringify(lists));
    };

    // Theme loading function removed as dark/light mode is no longer a feature.

    // Helper function to format time difference
    const formatTimeDifference = (targetDateString, targetTimeString) => {
        if (!targetDateString) return ''; // Return empty string if no due date

        const now = new Date();
        const targetDateTime = new Date(`${targetDateString}T${targetTimeString || '23:59:59'}`); // Default to end of day if no time
        const diffMs = targetDateTime.getTime() - now.getTime();

        const absDiffMs = Math.abs(diffMs);
        const isFuture = diffMs > 0;
        const prefix = isFuture ? 'Due in' : '';
        const suffix = isFuture ? '' : 'ago';

        const seconds = Math.floor(absDiffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30.44); // Average days in a month
        const years = Math.floor(days / 365.25); // Average days in a year

        if (years > 0) return `${prefix} ${years} year${years > 1 ? 's' : ''} ${suffix}`.trim();
        if (months > 0) return `${prefix} ${months} month${months > 1 ? 's' : ''} ${suffix}`.trim();
        if (days > 0) return `${prefix} ${days} day${days > 1 ? 's' : ''} ${suffix}`.trim();
        if (hours > 0) return `${prefix} ${hours} hour${hours > 1 ? 's' : ''} ${suffix}`.trim();
        if (minutes > 0) return `${prefix} ${minutes} minute${minutes > 1 ? 's' : ''} ${suffix}`.trim();
        if (seconds >= 0) return `${prefix} ${seconds} second${seconds > 1 ? 's' : ''} ${suffix}`.trim(); // >=0 to handle 'now' or '0 seconds ago'

        return '';
    };


    // --- Core Functions ---

    // Render Lists
    const renderLists = () => {
        listContainer.innerHTML = ''; // Clear existing lists
        lists.forEach(listName => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-item');
            if (listName === activeList) {
                listItem.classList.add('active');
            }
            listItem.dataset.list = listName;

            let iconClass = 'fas fa-tasks'; // Default icon for lists
            if (listName === 'All Tasks') iconClass = 'fas fa-home';
            else if (listName === 'Work') iconClass = 'fas fa-briefcase';
            else if (listName === 'Personal') iconClass = 'fas fa-user';
            else if (listName === 'Shopping') iconClass = 'fas fa-shopping-cart';
            else if (listName === 'Academics') iconClass = 'fas fa-book-open';
            else if (listName === 'Health') iconClass = 'fas fa-heartbeat';
            else if (listName === 'Finance') iconClass = 'fas fa-money-bill-wave';
            else if (listName === 'Home Chores') iconClass = 'fas fa-broom';
            else if (listName === 'Creative Projects') iconClass = 'fas fa-lightbulb';


            listItem.innerHTML = `<i class="${iconClass}"></i> ${listName}`;
            listContainer.appendChild(listItem);
        });

        // Populate list select in form
        taskListSelect.innerHTML = '';
        lists.filter(l => l !== 'All Tasks').forEach(listName => { // 'All Tasks' is not a category for new tasks
            const option = document.createElement('option');
            option.value = listName;
            option.textContent = listName;
            taskListSelect.appendChild(option);
        });
        if (lists.includes('All Tasks') && lists.length === 1) { // If only 'All Tasks' is present, add a dummy for selection
            const option = document.createElement('option');
            option.value = 'General';
            option.textContent = 'General';
            taskListSelect.appendChild(option);
        }
    };

    // Render Tasks
    const renderTasks = () => {
        taskListDiv.innerHTML = ''; // Clear existing tasks

        // Filter tasks
        const filteredTasks = tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchInput.value.toLowerCase());
            const matchesList = activeList === 'All Tasks' || task.list === activeList;
            const matchesStatus = filterStatusSelect.value === 'all' ||
                                  (filterStatusSelect.value === 'completed' && task.completed) ||
                                  (filterStatusSelect.value === 'active' && !task.completed);
            return matchesSearch && matchesList && matchesStatus;
        });

        // Sort tasks
        const sortedTasks = [...filteredTasks].sort((a, b) => {
            const sortBy = sortBySelect.value;

            // First, sort by completion status (completed tasks go to the end)
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }

            // Then apply primary sort criteria
            if (sortBy === 'deadline') {
                const dateA = new Date(a.dueDate + 'T' + (a.dueTime || '23:59:59'));
                const dateB = new Date(b.dueDate + 'T' + (b.dueTime || '23:59:59'));
                return dateA.getTime() - dateB.getTime();
            } else if (sortBy === 'priority') {
                const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            } else if (sortBy === 'status') {
                // If status is the primary sort, completed tasks are already handled, so no secondary sort needed here.
                // We just rely on the completion sort.
                return 0;
            }
            return 0;
        });

        if (sortedTasks.length === 0) {
            noTasksMessage.style.display = 'block';
        } else {
            noTasksMessage.style.display = 'none';
            sortedTasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('task-item', 'entering'); // Add 'entering' class for animation
                taskItem.dataset.id = task.id;

                if (task.completed) {
                    taskItem.classList.add('completed');
                }

                // Determine time info and class for overdue/due in
                const now = new Date();
                let taskDateTime;
                let timeInfoText = '';
                let timeInfoClass = '';

                if (task.dueDate) {
                     taskDateTime = new Date(`${task.dueDate}T${task.dueTime || '23:59:59'}`);
                     timeInfoText = formatTimeDifference(task.dueDate, task.dueTime);

                     if (!task.completed && taskDateTime < now) {
                        taskItem.classList.add('overdue');
                        timeInfoClass = 'overdue';
                     } else if (!task.completed && taskDateTime > now) {
                        timeInfoClass = 'due-in';
                     }
                }

                taskItem.innerHTML = `
                    <div class="task-content">
                        <button class="task-toggle-button" aria-label="${task.completed ? 'Mark as active' : 'Mark as completed'}">
                            <i class="${task.completed ? 'fas fa-check-circle' : 'far fa-circle'}"></i>
                        </button>
                        <div>
                            <h3 class="task-title">${task.title}</h3>
                            ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                        </div>
                    </div>
                    <div class="task-meta">
                        ${task.dueDate ? `<span><i class="far fa-calendar-alt"></i> ${task.dueDate}</span>` : ''}
                        ${task.dueTime ? `<span><i class="far fa-clock"></i> ${task.dueTime}</span>` : ''}
                        <span class="priority-label ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>
                        ${task.list && task.list !== 'All Tasks' ? `<span><i class="fas fa-list"></i> ${task.list}</span>` : ''}
                        ${timeInfoText ? `<span class="time-info ${timeInfoClass}">${timeInfoText}</span>` : ''}
                    </div>
                    <div class="task-actions">
                        <button class="action-button edit" aria-label="Edit task"><i class="fas fa-edit"></i></button>
                        <button class="action-button delete" aria-label="Delete task"><i class="fas fa-trash-alt"></i></button>
                    </div>
                `;
                taskListDiv.appendChild(taskItem);
            });
        }
    };

    // Show/Hide Modal
    const showModal = (title, submitButtonText) => {
        modalTitle.textContent = title;
        formSubmitBtn.textContent = submitButtonText;
        taskModal.classList.add('show');
    };

    const hideModal = () => {
        taskModal.classList.remove('show');
        taskForm.reset(); // Clear form fields
        editingTaskId = null; // Reset editing state
    };

    // Add Task
    const addTask = (title, description, dueDate, dueTime, priority, list) => {
        const newTask = {
            id: Date.now().toString(), // Unique ID
            title,
            description,
            dueDate,
            dueTime,
            priority,
            list,
            completed: false,
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        showReminderNotification('Task added successfully!');
    };

    // Edit Task
    const editTask = (id, title, description, dueDate, dueTime, priority, list) => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title,
                description,
                dueDate,
                dueTime,
                priority,
                list
            };
            saveTasks();
            renderTasks();
            showReminderNotification('Task updated successfully!');
        }
    };

    // Toggle Task Completion
    const toggleTaskCompletion = (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
            showReminderNotification(task.completed ? 'Task marked as completed!' : 'Task marked as active!');
        }
    };

    // Delete Task
    const deleteTask = (id) => {
        const taskItem = document.querySelector(`.task-item[data-id="${id}"]`);
        if (taskItem) {
            taskItem.classList.add('leaving'); // Start leaving animation
            taskItem.addEventListener('animationend', () => {
                tasks = tasks.filter(task => task.id !== id);
                saveTasks();
                renderTasks(); // Re-render after animation
                showReminderNotification('Task deleted successfully!');
            }, { once: true });
        }
    };

    // Add New List
    const addNewList = () => {
        const listName = prompt('Enter new list name:');
        if (listName && listName.trim() !== '' && !lists.includes(listName.trim())) {
            lists.push(listName.trim());
            saveLists();
            renderLists();
            // Automatically switch to the new list
            activeList = listName.trim();
            renderLists();
            renderTasks();
            showReminderNotification(`List "${listName.trim()}" added!`);
        } else if (listName && lists.includes(listName.trim())) {
            alert('List with this name already exists!');
        }
    };

    // Show Reminder Notification
    const showReminderNotification = (message) => {
        let notification = document.querySelector('.reminder-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.classList.add('reminder-notification');
            document.body.appendChild(notification);
        }

        notification.innerHTML = `
            <span>${message}</span>
            <button class="close-btn">&times;</button>
        `;
        notification.style.display = 'flex';
        notification.classList.remove('fadeOut');
        notification.classList.add('slideInUp');

        notification.querySelector('.close-btn').onclick = () => {
            notification.classList.remove('slideInUp');
            notification.classList.add('fadeOut');
            notification.addEventListener('animationend', () => {
                notification.style.display = 'none';
                notification.classList.remove('fadeOut');
            }, { once: true });
        };

        clearTimeout(notification.timeoutId);
        notification.timeoutId = setTimeout(() => {
            notification.classList.remove('slideInUp');
            notification.classList.add('fadeOut');
            notification.addEventListener('animationend', () => {
                notification.style.display = 'none';
                notification.classList.remove('fadeOut');
            }, { once: true });
        }, 3000);
    };


    // --- Event Listeners ---

    // No theme toggle event listener as it's removed.

    // Add Task Button (Floating Action Button)
    addTaskBtn.addEventListener('click', () => {
        taskForm.reset();
        editingTaskId = null;

        showModal('Add New Task', 'Add Task');
        if (activeList !== 'All Tasks' && lists.includes(activeList)) {
            taskListSelect.value = activeList;
        } else {
            const firstValidListOption = lists.find(l => l !== 'All Tasks');
            if (firstValidListOption && taskListSelect.querySelector(`option[value="${firstValidListOption}"]`)) {
                taskListSelect.value = firstValidListOption;
            } else if (taskListSelect.options.length > 0) {
                 taskListSelect.value = taskListSelect.options[0].value;
            }
        }
    });

    // Close Modal Button & Click outside modal
    closeModalBtn.addEventListener('click', hideModal);
    taskModal.addEventListener('click', (e) => {
        if (e.target === taskModal) {
            hideModal();
        }
    });

    // Task Form Submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskTitleInput.value.trim();
        const description = taskDescriptionInput.value.trim();
        const dueDate = taskDueDateInput.value;
        const dueTime = taskDueTimeInput.value;
        const priority = taskPrioritySelect.value;
        const list = taskListSelect.value;

        if (!title) {
            alert('Task title is required!');
            return;
        }

        if (editingTaskId) {
            editTask(editingTaskId, title, description, dueDate, dueTime, priority, list);
        } else {
            addTask(title, description, dueDate, dueTime, priority, list);
        }
        hideModal();
    });

    // List Selection in Sidebar (Event Delegation)
    listContainer.addEventListener('click', (e) => {
        const listItem = e.target.closest('.list-item');
        if (listItem) {
            document.querySelectorAll('.list-item').forEach(item => item.classList.remove('active'));
            listItem.classList.add('active');

            activeList = listItem.dataset.list;
            renderTasks();
        }
    });

    // Add List Button
    addListButton.addEventListener('click', addNewList);

    // Search and Filter/Sort Events
    searchInput.addEventListener('input', renderTasks);
    filterStatusSelect.addEventListener('change', renderTasks);
    sortBySelect.addEventListener('change', renderTasks);

    // Task List Actions (Toggle, Edit, Delete) - Event Delegation
    taskListDiv.addEventListener('click', (e) => {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;

        const taskId = taskItem.dataset.id;

        // Toggle completion
        if (e.target.closest('.task-toggle-button')) {
            toggleTaskCompletion(taskId);
        }
        // Edit task
        else if (e.target.closest('.action-button.edit')) {
            editingTaskId = taskId;
            const taskToEdit = tasks.find(task => task.id === taskId);
            if (taskToEdit) {
                showModal('Edit Task', 'Save Changes');
                taskTitleInput.value = taskToEdit.title;
                taskDescriptionInput.value = taskToEdit.description;
                taskDueDateInput.value = taskToEdit.dueDate;
                taskDueTimeInput.value = taskToEdit.dueTime;
                taskPrioritySelect.value = taskToEdit.priority;
                taskListSelect.value = taskToEdit.list;
            }
        }
        // Delete task
        else if (e.target.closest('.action-button.delete')) {
            if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
                deleteTask(taskId);
            }
        }
    });

    // --- Initial Load ---
    // No theme loading function call here.
    loadLists();
    loadTasks();
});
