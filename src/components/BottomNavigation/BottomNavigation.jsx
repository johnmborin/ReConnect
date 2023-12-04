import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';

function LabelBottomNavigation() {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation
                showLabels
                sx={{ backgroundColor: '#1399a3', color: 'white', width: 400 }}
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction
                    label="Resources"
                    value="Resources"
                    icon={<LibraryBooksIcon sx={{ color: 'white' }} />}
                    style={{ color: 'white' }}
                    component={Link}
                    to="/resources"
                />
                <BottomNavigationAction
                    label="Journal"
                    value="Journal"
                    icon={<NoteAltIcon sx={{ color: 'white' }} />}
                    style={{ color: 'white' }}
                    component={Link}
                    to="/journal"
                />
                <BottomNavigationAction
                    label="Calendar"
                    value="Calendar"
                    icon={<CalendarMonthIcon sx={{ color: 'white' }} />}
                    style={{ color: 'white' }}
                    component={Link}
                    to="/calendar"
                />
                <BottomNavigationAction
                    label="Join Family"
                    value="Family"
                    icon={<GroupsIcon sx={{ color: 'white' }} />}
                    style={{ color: 'white' }}
                   // ADD ROUTE TO JOIN FAMILY ONCE CREATED
                    //component={Link}
                    //to="/family"
                />
            </BottomNavigation>
        </div>
    );
}

export default LabelBottomNavigation;