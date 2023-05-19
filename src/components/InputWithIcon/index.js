import { InputWithIconWrapper } from "./styles";

export default function InputWithIcon({
  left,
  right,
  label,
  placeholder,
  value,
  setValue,
  type,
  onEnter,
  disabled
}) {
  function handleEnterKey(e) {
    e.key === 'Enter' && onEnter();
  }

  return (
    <InputWithIconWrapper>
      {label && <span>{label}</span>}

      <label>
        {left && <img src={left.src} className="left" alt="-"/>}

        <input 
          placeholder={placeholder} 
          value={value}
          onChange={e => setValue(e.target.value)}
          type={type}
          onKeyDown={handleEnterKey}
          disabled={disabled}
        />

        {right && 
          <img src={right.src} className="right" alt="-" onClick={right.onClick}/>
        }
      </label>
    </InputWithIconWrapper>
  )
}