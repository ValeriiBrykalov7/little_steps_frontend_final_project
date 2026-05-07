import css from './Loader.module.css';

type LoaderProps = {
  variant?: 'page' | 'inline' | 'button';
};

export const Loader = ({ variant = 'page' }: LoaderProps) => {
  const isButtonLoader = variant === 'button';
  const isInlineLoader = variant === 'inline';

  return (
    <div
      className={`${css.loaderWrapper} ${
        isButtonLoader ? css.buttonLoaderWrapper : ''
      } ${isInlineLoader ? css.inlineLoaderWrapper : ''}`}
    >
      <div
        className={`${css.loader} ${isButtonLoader ? css.buttonLoader : ''}`}
      ></div>
    </div>
  );
};
