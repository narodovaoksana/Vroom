import React from 'react';

const Verification = () => {
  return (
    <div>
      <h1>Verification</h1>
      <form>
        <input type="file" accept="image/*" required />
        <button type="submit">Upload Documents</button>
      </form>
    </div>
  );
};

export default Verification;