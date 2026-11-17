import { Link, useParams } from 'react-router-dom';
import { getTheme } from '../../data/themes';

export default function ThemePreview() {
  const { themeId = '' } = useParams();
  const theme = getTheme(themeId);
  if (!theme) {
    return (
      <div className="route-loading">
        <p>This invitation theme could not be found.</p>
        <Link to="/#themes">Back to themes</Link>
      </div>
    );
  }
  const Theme = theme.component;
  return <Theme />;
}
