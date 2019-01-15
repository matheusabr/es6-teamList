// Team class: represents a Team
class Team {
    constructor(name, country, majors) {
        this.name = name;
        this.country = country;
        this.majors = majors;
    }
}

// UI Class: handle UI tasks
class UI {
    static displayTeams() {
        const StoredTeams = [
            {
                name: 'MiBr',
                country: 'Brazil',
                majors: 3
            },
            {
                name: 'Astralis',
                country: 'Denmark',
                majors: 2
            },
        ];

        const teams = StoredTeams;
        console.table(teams);

        teams.forEach((team) => UI.addTeam(team))
    }

    static addTeam(team) {
        const list = document.querySelector('#team-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${team.name}</td>
        <td>${team.country}</td>
        <td>${team.majors}</td>
        <td><a href="#" class="btn btn-danger btn-small delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteTeam(el) {
        // console.log(el);
        // If element class constains delete
        if (el.classList.contains('delete')) {
            // Remove the complete line (tr>td)
            el.parentElement.parentElement.remove();
        }
    }

    static showMessage(message, className) {
        // Create a div element
        // Set class and append the message
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        // Get container element
        const container = document.querySelector('.container');
        // Get form element
        const form = document.querySelector('#team-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000);
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#country').value = '';
        document.querySelector('#majors').value = '';
    }
}

// Store Class: handles storage

// Event: display Teams
document.addEventListener('DOMContentLoaded', UI.displayTeams);

// Event: add a Team
document.querySelector('#team-form').addEventListener('submit', (e) => {
    // Prevent submit default refresh action
    e.preventDefault()

    // Get form values
    const name = document.querySelector('#name').value;
    const country = document.querySelector('#country').value;
    const majors = document.querySelector('#majors').value;

    // Validate before save
    if (name === '' || country === '' || majors === '') {
        // Show message
        UI.showMessage('Please fill out the form!', 'danger')
    } else {
        // Instantiate Team
        const team = new Team(name, country, majors);

        // Add Team to list
        UI.addTeam(team);

        // Clear fields
        UI.clearFields();
    }
});

// Event: remove a team
document.querySelector('#team-list').addEventListener(('click'), (e) => {
    // Log clicked component
    // console.log(e.target);
    
    // Delete the team
    UI.deleteTeam(e.target);
})