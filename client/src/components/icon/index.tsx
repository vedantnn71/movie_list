import search from '@/assets/icons/search.svg';
import video from '@/assets/icons/video.svg';
import plus from '@/assets/icons/plus.svg';
import user from '@/assets/icons/user.svg';
import image from '@/assets/icons/image.svg'; 

const icons = {
  search,
  video,
  plus,
  user,
  image
};

interface IconProps  {
  name: 'search' | 'video' | 'plus' | 'user' | 'image';
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