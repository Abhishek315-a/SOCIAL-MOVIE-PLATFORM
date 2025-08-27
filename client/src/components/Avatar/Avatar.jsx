import React, { useState } from 'react';

const getInitials = (name) => {
  if (!name) return '?';
  const names = name.trim().split(' ');
  return (names[0][0] + (names[1]?.[0] || '')).toUpperCase();
};

const Avatar = ({
  name = 'User',
  src = '', // image URL
  size = 30,
  bgColor = '#4A90E2',
  textColor = '#fff',
  fontSize,
  style = {},
}) => {
  const [imgError, setImgError] = useState(false);
  const initials = getInitials(name);

  const commonStyles = {
    width: size,
    height: size,
    borderRadius: '50%',
    fontSize: fontSize || size / 2.5,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    overflow: 'hidden',
    userSelect: 'none',
    ...style,
  };

  return (
    imgError || !src ? (
      <div style={{ ...commonStyles, backgroundColor: bgColor, color: textColor }}>
        {initials}
      </div>
    ) : (
      <img
        src={src}
        alt={name}
        style={{ ...commonStyles, objectFit: 'cover' }}
        onError={() => setImgError(true)}
      />
    )
  );
};

export default Avatar;
