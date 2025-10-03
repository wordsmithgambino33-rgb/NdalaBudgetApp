import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

const Calendar = ({ showOutsideDays = true, style, ...props }) => {
  return (
    <RNCalendar
      style={[styles.calendar, style]}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#666666',
        selectedDayBackgroundColor: '#007bff',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#007bff',
        dayTextColor: '#333333',
        textDisabledColor: '#d9e1e8',
        arrowColor: '#007bff',
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    padding: 12,
  },
});

export { Calendar };
