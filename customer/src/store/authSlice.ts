interface AuthState {
    token: string | null;
    // ... other auth state properties ...
}

const initialState: AuthState = {
    token: null,
    // ... other initial state values ...
}; 