import React from 'react';

const C_texto = React.forwardRef((props, ref) => {
  const handleInput = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height according to content
  };

  return (
    <>
      <textarea
        id='textarea'
        ref={ref}
        onInput={handleInput}
        {...props} // Pasamos las props (incluyendo el registro de react-hook-form)
        rows="1"

        placeholder="Escribe algo aquí..."
      />
    </>
  );
});

export default C_texto;
