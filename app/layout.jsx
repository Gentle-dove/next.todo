import './globals.css';
import { TodosProvider } from '../context/TodosContext';

export const metadata = {
  title: 'Next Todo App',
  description: 'Todo app with persistence and shared state',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TodosProvider>{children}</TodosProvider>
      </body>
    </html>
  );
}
