// Desc: Giveaway Purpose Options
const GiveawayOptions = [
    { value: 'Support Awaays', label: 'Support Awaays'},
    { value: 'General Giveaway', label: 'General Giveaway'},
    { value: 'Healthcare Support', label: 'Healthcare Support' },
    { value: 'Prison Outreach', label: 'Prison Outreach' },
    { value: 'Homeless Shelters', label: 'Homeless Shelters' },
    { value: 'Education Support', label: 'Education Support' },
    { value: 'Orphanages Support', label: 'Orphanages Support' },
    { value: 'Disaster Relief', label: 'Disaster Relief' },
    { value: 'Disabilities Support', label: 'Disabilities Support' },
]


const customStyles = {
    container: (provided) => ({
        ...provided,
        borderRadius: '.5rem',
    }),

    control: (provided) => ({
        ...provided,
        backgroundColor: 'var(--bg-color)', // Set background color for the control (the input area)
        borderColor: 'var(--s-color)', // Set border color
        borderRadius: '.5rem', // Custom border radius
        paddingLeft: '5px',
        fontSize: '16.5px', // Font size for the input
        width: '100%', // Adjust the width of the input
        boxSizing: 'border-box',
    }),

    input: (provided) => ({
        ...provided,
        color: '#666',
    }),

    placeholder: (provided) => ({
        ...provided,
        color: '#4b5563', // Placeholder text color
        fontWeight: '500', // Placeholder font size
    }),

    singleValue: (provided) => ({
        ...provided,
        color: '#666',
    }),

    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'var(--p-color)' : 'var(--bg-color)', // Background color on hover/selected state
        color: state.isSelected ? '#fff' : '#666', // Text color for selected option
        padding: '10px',
        cursor: 'pointer', 
        ':hover': {
            color: '#fff',
            backgroundColor: 'var(--p-color)', // Background color on hover
        },
    }),

    menu: (provided) => ({
        ...provided,
        // height: '20rem;',
        borderRadius: '.5rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        position: 'relative',
        border: '1px solid var(--p-color)',
        marginTop: '-3.2rem'
    }),

    menuList: (provided) => ({
        ...provided,
        width: '19.5rem',
        overflow: 'auto',
    }),
};


export { GiveawayOptions, customStyles }

