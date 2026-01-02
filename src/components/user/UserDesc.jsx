

function UserDesc({
  type,
  photo,
  email,
  fone,
  gender,
}) {
  return (
    <>
      <img
        src={photo || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
        style={{ width: "120px", borderRadius: "50%" }}
      />
      <p>
        <span>Type:</span> {type}
      </p>
    
      <p>
        <span>E-Mail:</span> {email}
      </p>
      <p>
        <span>Telefone</span> {fone}
      </p>
      <p>
        <span>Gênero:</span> {gender}
      </p>
   </>
  );
}

export default UserDesc;
