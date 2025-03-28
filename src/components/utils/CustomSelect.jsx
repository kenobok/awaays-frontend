import Select from 'react-select';

const CustomSelect = ({ options, onChange, value, placeholder }) => {
    const customStyles = {
        container: (provided) => ({
            ...provided,
            borderRadius: '.5rem',
            height: '100%',
            overflow: 'hidden',
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
            color: '#888',
        }),
    
        placeholder: (provided) => ({
            ...provided,
            color: '#777', 
            fontWeight: '500',
            display: 'block', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden',
            textOverflow: 'ellipsis', 
            maxWidth: '100%',
        }),
    
        singleValue: (provided) => ({
            ...provided,
            color: '#777',
        }),
    
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'var(--p-color)' : 'var(--bg-color)', // Background color on hover/selected state
            color: state.isSelected ? '#fff' : '#666', // Text color for selected option
            padding: '5px 10px',
            cursor: 'pointer', 
            ':hover': {
                color: '#fff',
                backgroundColor: 'var(--p-color)', // Background color on hover
            },
        }),
    
        menu: (provided) => ({
            ...provided,
            height: '11rem;',
            borderRadius: '.5rem',
            boxShadow: '0',
            position: 'relative',
            transform: 'translateY(-14rem)',
            border: 'none',
        }),
    
        menuList: (provided) => ({
            ...provided,
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '.5rem',
            boxShadow: '0',
        }),
    };

    return  (
        <Select options={ options } name="selectCountryFilter" value={ value } onChange={ onChange } styles={ customStyles } placeholder={ placeholder } />
    )

}


export default CustomSelect;
