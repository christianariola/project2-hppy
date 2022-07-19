import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Chip from '@mui/material/Chip';
import TextField from "@mui/material/TextField";
import Downshift from "downshift";

export default function DepartmentsInput({ ...props }) {
    const { selectedDepartments, placeholder, departments, ...other } = props;
    const [inputValue, setInputValue] = useState("");
    const [selectedItem, setSelectedItem] = useState([]);

    useEffect(() => {
        setSelectedItem(departments);
    }, [departments]);

    useEffect(() => {
        selectedDepartments(selectedItem);
    }, [selectedItem, selectedDepartments]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault()
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue("");
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }
  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder
          });
          return (
            <div>
              <TextField
                InputProps={{
                  startAdornment: selectedItem.map(item => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      onDelete={handleDelete(item)}
                    />
                  )),
                  onBlur,
                  onChange: event => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus
                }}
                {...other}
                {...inputProps}
              />
            </div>
          );
        }}
      </Downshift>
  );
}
DepartmentsInput.defaultProps = {
  departments: []
};
DepartmentsInput.propTypes = {
  selectedDepartments: PropTypes.func.isRequired,
  departments: PropTypes.arrayOf(PropTypes.string)
};