import { PageLayout } from '@/components/page-layout/page-layout';
import { Link } from 'react-router-dom';

export const RegisterPage = (): React.JSX.Element => {
  return (
    <PageLayout>
      <div>
        <h2 className="text text_type_main-medium">Регистрация</h2>
      </div>

      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </PageLayout>
  );
};
