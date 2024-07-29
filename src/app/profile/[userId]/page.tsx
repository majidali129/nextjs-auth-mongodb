const UserInfoPage = ({ params }: any) => {
  const { userId } = params;
  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      {userId}
    </div>
  );
};

export default UserInfoPage;
