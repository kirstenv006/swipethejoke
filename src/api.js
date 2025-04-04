export async function getData() {
    const response = await fetch("https://icanhazdadjoke.com/");
    if (!response.ok) {
      throw new Error(`HTTP-fout! Status: ${response.status}`);
    }
    return response.json();
  }
  