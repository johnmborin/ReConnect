import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import GroupsIcon from '@mui/icons-material/Groups';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        sx={{ backgroundColor: '#1399a3', color: 'white', width: 400 }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon sx={{ color: 'white' }} />}
          style={{ color: 'white' }}
        />
        <BottomNavigationAction
          label="Journal"
          value="Journal"
          icon={<NoteAltIcon sx={{ color: 'white' }} />}
          style={{ color: 'white' }}
        />
       <BottomNavigationAction
          label="Calendar"
          value="Calendar"
          icon={<CalendarMonthIcon sx={{ color: 'white' }} />}
          style={{ color: 'white' }}
        />
        <BottomNavigationAction
          label="Join Family"
          value="Family"
          icon={<GroupsIcon sx={{ color: 'white' }} />}
          style={{ color: 'white' }}
        />
      </BottomNavigation>
    </div>
  );
}