import search from '@/assets/icons/search.svg';
import video from '@/assets/icons/video.svg';

const icons = {
  search,
  video,
};

interface IconProps  {
  name: 'search' | 'video';
  size?: string;
  color?: string;
}

const Icon = ({ name, size, color }: IconProps) => {
  const icon = icons[name];

  return <img
    src={icon}
    height={size}
    width={size}
    style={{ color }}
  />;
}

export default Icon;