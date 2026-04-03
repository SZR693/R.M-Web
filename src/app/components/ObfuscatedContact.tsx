export function ObfuscatedEmail() {
  const user = "contact.rmwebdesign";
  const domain = "gmail.com";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <a 
      href="#" 
      onClick={handleClick}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      {user}@{domain}
    </a>
  );
}

export function ObfuscatedPhone() {
  const part1 = "+33";
  const part2 = "6 43 36 78 37";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `tel:${part1}${part2.replace(/\s/g, '')}`;
  };

  return (
    <a 
      href="#" 
      onClick={handleClick}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      {part1} {part2}
    </a>
  );
}