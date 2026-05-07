interface IconProps {
  name: string;
  size: number;
  className: string;
}

export default function Icon({ name, size, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
