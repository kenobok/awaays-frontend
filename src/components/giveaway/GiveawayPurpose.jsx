const GiveawayPurpose = ({ value, onChange, error }) => {
    const options = [
        { id: 2, value: 'General Giveaway', label: 'General Giveaway' },
        { id: 3, value: 'Healthcare Support', label: 'Healthcare Support' },
        { id: 4, value: 'Prison Outreach', label: 'Prison Outreach' },
        { id: 5, value: 'Homeless Shelters', label: 'Homeless Shelters' },
        { id: 6, value: 'Education Support', label: 'Education Support' },
        { id: 7, value: 'Orphanages Support', label: 'Orphanages Support' },
        { id: 8, value: 'Disaster Relief', label: 'Disaster Relief' },
        { id: 9, value: 'Disabilities Support', label: 'Disabilities Support' },
        { id: 1, value: 'Support Awaays', label: 'Support Awaays' },
    ];

    return (
        <div className="form-input country-select">
            <select name="purpose" value={value} onChange={onChange} className={`${error ? 'error' : ''}`}>
                <option value="">Select Giveaway Purpose</option>
                {options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <small className="text-red-500">{error}</small>}
        </div>
    );
};


export default GiveawayPurpose;

