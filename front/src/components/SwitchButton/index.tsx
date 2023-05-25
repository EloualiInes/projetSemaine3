import React, { useState } from 'react';
import styles from './styles.module.css'
import { TypeSwitchButton } from '../../types/components/typeSwitchButton';

const SwitchButton = (data: TypeSwitchButton) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
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

