import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import { API_BASE_URL, PERSON_INFO_URL, POLICIES_PORT } from '../../config';

function SelectSearchBox(props) {
  const {
    labelTitle,
    labelDescription,
    containerStyle,
    labelStyle,
    updateType,
    updateFormValue,
    fetchOptionsEndpoint,
  } = props;

  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoadingOptions(true);

      var endpoint = '';

      if (fetchOptionsEndpoint === 'persons') {
        endpoint = `${API_BASE_URL}${POLICIES_PORT}${PERSON_INFO_URL}/checkPerson`;
      }

      try {
        const response = await axios.post(endpoint, { identity: searchTerm });
        const data = response.data;
        setFilteredOptions(data);
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoadingOptions(false);
      }
    };

    if (searchTerm && searchTerm.trim() !== '') {
      fetchOptions();
    }
  }, [fetchOptionsEndpoint, searchTerm]);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    updateFormValue({ updateType, value: selectedOption });
  };

  const renderOptions = () => {
    return filteredOptions.map((option) => ({
      value: option,
      label: option.longValue,
    }));
  };

  return (
    <div className={`inline-block ${containerStyle}`}>
      <label className={`label ${labelStyle}`}>
        <div className="label-text">
          {labelTitle}
          {labelDescription && (
            <div className="tooltip tooltip-right" data-tip={labelDescription}>
              <InformationCircleIcon className="w-4 h-4" />
            </div>
          )}
        </div>
      </label>

      <Select
        isSearchable
        options={renderOptions()}
        onInputChange={handleInputChange}
        onChange={handleSelectChange}
        value={selectedOption}
        isLoading={loadingOptions}
        placeholder="Search..."
      />
    </div>
  );
}

export default SelectSearchBox;