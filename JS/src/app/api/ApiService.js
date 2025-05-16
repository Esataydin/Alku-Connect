import { ACCESS_TOKEN } from "../../constants";

// GET request using fetch
const getData = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/your-endpoint`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Optional, add if needed
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Process data
    } catch (error) {
        console.error('Fetch error:', error);
    }
};
// POST request using fetch
const postData = async (data) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/your-endpoint`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
            body: JSON.stringify(data),  // Send the data as a JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
    } catch (error) {
        console.error('Fetch error:', error);
    }
};



export const Login = async (email, password) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    // check if token exists
    console.log("token", token)
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/token/`, {
            method: 'POST',
            headers: {
                // 'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
            body: JSON.stringify({ email, password }),  // Send the data as a JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export const Register = async (email, password) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/user/register/`, {
            method: 'POST',
            // TODO: Remove header from Register and login with given credentials after registration
            headers: {
                // 'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
            body: JSON.stringify({ email, password }),  // Send the data as a JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export const GetFindUserData = async (id) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/users/${id}/update/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


export const GetUsersData = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/users/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export const GetPostData = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/posts/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export const DeletePostData = async (id) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/posts/delete/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
        });
        if (response.status === 204) {
            return true
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
export const CreatePostData = async (content, title) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/posts/`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
            body: JSON.stringify({ content, title }),
        });
        console.log("create Post", response)
        if (response.status === 201) {
            return true
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
// TODO: Fix the endpoint to post comment for a specific post
// For example, if you want to get comments for a post, you would use:
// POST http://127.0.0.1:8000/api/posts/{post_id}/comments/ is the endpoint
export const CreateCommentData = async (content="", created_at="", postId) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/posts/${postId}/comments/`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
            body: JSON.stringify({ content, created_at }),
        });
        console.log("create comment", response)
        if (response.status === 201) {
            return true
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
// TODO: Fix the endpoint to get comments for a specific post
// For example, if you want to get comments for a post, you would use:
// DELETE http://127.0.0.1:8000/api/posts/{post_id}/comments/delete/{comment_id} is the endpoint
export const GetComments = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/posts/1/comments/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
// TODO: Fix the endpoint to delete the comment for a specific post
// For example, if you want to delete the comment for a post, you would use:
// http://127.0.0.1:8000/api/posts/{post_id}/comments/ is the endpoint

const getUsers= async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/users`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData; 
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const postChatMessage= async (data) => {
    // data = { message: "Hello", participant: 2 }
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/chats`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                messages: data.message,
                participant_2: data.participant,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

export const getChatMessages = async (data) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/chats/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json', 
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json(); // <- await ekledik
        console.log("getChatMessages", json); // <- şimdi veri görünecek
        return json
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

export const getSoUsers = async (id) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/${id}/users/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json', 
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json(); // <- await ekledik
        console.log("getChatMessages", json); // <- şimdi veri görünecek
        return json
    }   catch (error) {
        console.error('Fetch error:', error);
    }   
};

export const GetChatById = async (id) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${id}/update/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch chat by ID');

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

export const getFeedUsers = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/users/profile/feed/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json', 
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json(); // <- await ekledik
        console.log("feeduser", json); // <- şimdi veri görünecek
        return json
    }
    catch (error) {
        console.error('Fetch error:', error);
    }
};
export const UpdateChat = async (id, data) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${id}/update/`, {
            method: 'PUT',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to update chat');

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

export const PartialUpdateChat = async (chatId, data) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}/update/`, {
            method: 'PATCH',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update chat');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating chat:', error);
        return null;
    }
};

export const getUserData = async (userId) => {
    console.log("[getUserData] Başladı, userId:", userId);

    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log("[getUserData] Erişim token'ı alındı:", token);

    const url = `${import.meta.env.VITE_API_URL}/api/users/${userId}/update/`;
    console.log("[getUserData] İstek URL'si:", url);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
        });

        console.log("[getUserData] Fetch yanıtı alındı:", response);

        if (!response.ok) {
            console.error("[getUserData] Hata: response.ok false, status:", response.status);
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
        console.log("[getUserData] JSON parse edildi:", json);

        return json;
    } catch (error) {
        console.error('[getUserData] Hata yakalandı:', error);
    }
};


export const GetChats = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch chats');
        }

        const responseData = await response.json();
        console.log("GetChats response:", responseData);
        return responseData;
    } catch (error) {
        console.error('Error fetching chats:', error);
        return null;
    }
};
export async function updateUserProfile(userId, formValues, file) {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const data = new FormData();
    // append text fields
    Object.entries(formValues).forEach(([key, value]) => {
      data.append(key, value);
    });
    // append file if provided
    if (file) data.append('profile_picture', file);
  
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}/update/`, {
      method: 'PATCH',
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
        // Note: Do not set Content-Type for FormData
      },
      body: data
    });
    if (!res.ok) throw new Error(`Failed to update profile: ${res.status}`);
    return await res.json();
  }
  