import css from './Loader.module.css';

type LoaderProps = {
  variant?: 'page' | 'button';
};

export const Loader = ({ variant = 'page' }: LoaderProps) => {
  const isButtonLoader = variant === 'button';

  return (
    <div
      className={`${css.loaderWrapper} ${
        isButtonLoader ? css.buttonLoaderWrapper : ''
      }`}
    >
      <div
        className={`${css.loader} ${isButtonLoader ? css.buttonLoader : ''}`}
      ></div>
    </div>
  );
};
