// // // utils/avatarColor.js
// // export const stringToColor = (string) => {
// //   let hash = 0;
// //   for (let i = 0; i < string.length; i++) {
// //     hash = string.charCodeAt(i) + ((hash << 5) - hash);
// //   }
// //   let color = '#';
// //   for (let i = 0; i < 3; i++) {
// //     const value = (hash >> (i * 8)) & 0xff;
// //     color += (`00${value.toString(16)}`).slice(-2);
// //   }
// //   return color;
// // };

// // export const stringAvatar = (name) => {
// //   return {
// //     sx: {
// //       bgcolor: stringToColor(name),
// //       width: 120,
// //       height: 120,
// //       fontSize: 40
// //     },
// //     children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`
// //   };
// // };



// // utils/avatarColor.js
// export const stringToColor = (string) => {
//   let hash = 0;
//   for (let i = 0; i < string.length; i++) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   let color = '#';
//   for (let i = 0; i < 3; i++) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += (`00${value.toString(16)}`).slice(-2);
//   }
//   return color;
// };

// export const stringAvatar = (name) => {
//   if (!name) return { sx: { bgcolor: '#ccc', width: 120, height: 120, fontSize: 40 }, children: '?' };
  
//   const nameParts = name.split(' ');
//   const initials = nameParts.length > 1 
//     ? `${nameParts[0][0]}${nameParts[1][0]}` 
//     : `${nameParts[0][0]}${nameParts[0][1] || ''}`;
  
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//       width: 120,
//       height: 120,
//       fontSize: 40
//     },
//     children: initials.toUpperCase()
//   };
// };



// utils/avatarColor.js
export const stringToColor = (string) => {
  if (!string) return '#ccc';
  
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += (`00${value.toString(16)}`).slice(-2);
  }
  return color;
};

export const stringAvatar = (name) => {
  if (!name || typeof name !== 'string') {
    return { 
      sx: { 
        bgcolor: '#ccc', 
        width: 80, 
        height: 80, 
        fontSize: '2rem',
        fontWeight: 'bold'
      }, 
      children: '?' 
    };
  }
  
  // Clean the name and split into parts
  const cleanName = name.trim();
  const nameParts = cleanName.split(' ').filter(part => part.length > 0);
  
  let initials = '';
  
  if (nameParts.length >= 2) {
    // If we have first and last name, use first letter of each
    initials = `${nameParts[0][0]}${nameParts[1][0]}`;
  } else if (nameParts.length === 1) {
    // If we have only one name, use first two letters
    const singleName = nameParts[0];
    if (singleName.length >= 2) {
      initials = `${singleName[0]}${singleName[1]}`;
    } else {
      initials = singleName[0];
    }
  } else {
    initials = '?';
  }
  
  return {
    sx: {
      bgcolor: stringToColor(cleanName),
      width: 80,
      height: 80,
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    },
    children: initials.toUpperCase()
  };
};

// Alternative function for larger avatars
export const stringAvatarLarge = (name) => {
  const baseAvatar = stringAvatar(name);
  return {
    ...baseAvatar,
    sx: {
      ...baseAvatar.sx,
      width: 120,
      height: 120,
      fontSize: '3rem'
    }
  };
};

// Alternative function for small avatars
export const stringAvatarSmall = (name) => {
  const baseAvatar = stringAvatar(name);
  return {
    ...baseAvatar,
    sx: {
      ...baseAvatar.sx,
      width: 40,
      height: 40,
      fontSize: '1rem'
    }
  };
};
