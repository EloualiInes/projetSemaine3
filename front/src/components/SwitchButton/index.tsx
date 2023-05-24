import React, { useState } from 'react';
import styles from './styles.module.css'

const SwitchButton = (data : {
    label : string,
    onChange : () => void
  }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    console.log("isChecked :", isChecked)
    data.onChange();
  };

  return (
    <label className={styles.toggleSwitch}>
      <input id={data.label} type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className={styles.slider} />
    </label>
  );
};

export default SwitchButton;

