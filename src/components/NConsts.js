export function NLoading() {
    return false;
}

// Enable users donations
export function NDonations() {
    return false;
}

// Use PayPal sandbox account instead of live
export function NPaypalInfo() {
    const LIVE = true;
    if (LIVE)
        return { // LIVE
            sdk_clientid: "AZou0pB8z1QnlmJkSH9Gyi2M8gyEykclrkbargPTSQGrsqFKeGbvZIQvNO8GEnqjsdCOWIC4R5-2kKg8",
            client_id: "AZou0pB8z1QnlmJkSH9Gyi2M8gyEykclrkbargPTSQGrsqFKeGbvZIQvNO8GEnqjsdCOWIC4R5-2kKg8"
        }
    else
        return { // SANDBOX
            sdk_clientid: "sb",
            client_id: "AfQ0QYmBUDl3D9UwQ4oX1jV_qX65ON9q5pdb_BYk4ELsoSnUVx4kEZaHJWj2qraazHk8JY0SZYwZ1TJl"
        }
}