
const ProfileImages = ({ users }) => {
    const userCount = users.length;
    let layoutClass = '';

    if (userCount === 1) {
        layoutClass = 'profile-layout-1';
    } else if (userCount === 2) {
        layoutClass = 'profile-layout-2';
    } else if (userCount === 3) {
        layoutClass = 'profile-layout-3';
    } else {
        layoutClass = 'profile-layout-4';
    }

    return (
        <div className={`profile-container ${layoutClass}`}>
            {users.slice(0, 4).map((user, index) => (
                <img
                    key={index}
                    src={user.profileImageUrl}
                    alt={user.name}
                    className="profile-image"
                />
            ))}
        </div>
    );
};
export default ProfileImages;