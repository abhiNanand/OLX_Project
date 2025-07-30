function getDaysFromNow(isoDateString: string): string {
  const now = new Date();
  const target = new Date(isoDateString);

  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const targetUTC = Date.UTC(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  const diffInDays = Math.round((targetUTC - todayUTC) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'today';
  if (diffInDays === -1) return 'yesterday';

  return target.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export { getDaysFromNow, capitalizeFirstLetter };
