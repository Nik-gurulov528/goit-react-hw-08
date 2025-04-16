export const useRandomColor = () => {
  const rgb = [];
  for (let i = 0; i < 3; i += 1) {
    const randomIndex = Math.random().toFixed(0) * 150;
    rgb.push(randomIndex);
  }
  const stringRbg = 'rgb(' + rgb.join(', ') + ')';
  return stringRbg;
};
