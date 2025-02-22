export const formatDate = (dateString: string): string => {
  try {
    if (!dateString) {
      return 'Invalid date';
    }

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
};
