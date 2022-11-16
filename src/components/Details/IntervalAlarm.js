import Select from "react-select";

function IntervalAlarm(){

const options = [
    {value: 'no interval', label:'no interval'},
    {value: '30000' , label: '30min'},
    {value: '', label: '1h'},
    {value: '2h', label: '2h'}
]

const handleChange = (selectedOption) => {
    
    setTimeout(alert('Hello!'), selectedOption.value)
    console.log('handleChange', selectedOption.value)
}

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    //   const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled ? 'red' : 'blue',
        color: '#FFF',
        cursor: isDisabled ? 'not-allowed' : 'default',
    
      };
    },
    
  };

return(
    <>
<Select style={colourStyles} placeholder='no interval' options = {options}  onChange={handleChange} />

</>
)
}

export default IntervalAlarm