import { USERS as users } from './mockdata.js';

let nextId = users.length + 1;

export const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(user => user.id === id),
    },
    Mutation: {
        addUser: (_, { name, email }) => {
            if (users.some(user => user.email === email)) {
                throw new Error(`User with email "${email}" already exists.`);
            }
            const newuser = { id: String(nextId++), name, email };
            users.push(newuser);
            return newuser;
        },
        updateUser: (_, { id, name, email }) => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex === -1) return null;

            const updatedUser = {
                ...users[userIndex],
                name: name ?? users[userIndex].name,
                email: email ?? users[userIndex].email,
            }
            users[userIndex] = updatedUser;
            return {
                ...updatedUser
            };
        },
        deleteUser: (_, { id }) => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex === -1) return {
                success: false,
                users: [...users]
            };
            users.splice(userIndex, 1);
            return {
                success: true,
                users: [...users]
            };
        }
    }
};

