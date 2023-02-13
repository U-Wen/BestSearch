export async function chartMap(token: string, searchStr: string) {
  const json = await fetch(`http://3.141.23.218:5000/interview/keyword_search`, {
    method: "POST",
    body: JSON.stringify({ login_token: token, search_phrase: searchStr }),
  });
  const res = await json.json();
  return res;
}
