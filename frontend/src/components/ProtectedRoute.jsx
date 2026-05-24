import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950">
                <span className="text-sm font-semibold text-emerald-400 animate-pulse">Verifying access...</span>
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;

    return children;
}