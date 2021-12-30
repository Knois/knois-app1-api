import React, { useState } from 'react';
function Sparkle() {
  // Объявляем начальное состояние компонента
  // через переменную 'sparkle', являющуюся пустой строкой
  // Также определяем функцию 'addSparkle', которую будем
  // вызывать в обработчике кликов
  const [sparkle, addSparkle] = useState('');
  return (
    <div>
      <button onClick={() => addSparkle(sparkle + '\u2328')}>
        Add some sparkle
      </button>
      <p>{sparkle}</p>
    </div>
  );
}
export default Sparkle;
