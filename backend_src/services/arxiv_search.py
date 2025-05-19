"""
arXiv Paper Search Module

使用方法:
1. このモジュールをインポート:
   from arxiv_search import ArxivSearch

2. 検索の実行:
   # インスタンスの作成
   search = ArxivSearch()
   
   # 論文の検索（クエリと結果数を指定）
   papers = search.search_papers("quantum computing", max_results=10)
   
   # 結果の整形
   from arxiv_search import format_results
   formatted_output = format_results(papers)
   print(formatted_output)

3. 結果の形式:
   papers = [
       {
           'title': '論文のタイトル',
           'url': '論文のURL'
       },
       ...
   ]
"""

import arxiv
from typing import List, Dict

class ArxivSearch:
    def __init__(self):
        pass
    
    def search_papers(self, query: str, max_results: int = 5) -> List[Dict]:
        """Search papers using arXiv API."""
        search = arxiv.Search(
            query=query,
            max_results=max_results,
            sort_by=arxiv.SortCriterion.Relevance
        )
        
        papers = []
        for result in search.results():
            paper = {
                'title': result.title,
                'url': result.entry_id
            }
            papers.append(paper)
            
        return papers

def format_results(papers: List[Dict]) -> str:
    """Format the search results into a single string."""
    if not papers:
        return "No papers found. Try different keywords."
    
    output = []
    output.append(f"\nFound {len(papers)} papers:")
    output.append("-" * 80)
    
    for i, paper in enumerate(papers, 1):
        output.append(f"{i}. {paper['title']}")
        output.append(f"   URL: {paper['url']}")
        output.append("-" * 80)
    
    return "\n".join(output)

def get_number_of_results() -> int:
    """Get the number of results from user input."""
    while True:
        try:
            num = input("How many results do you want to see? (1-100): ").strip()
            if num.lower() == 'quit':
                return 0
            num = int(num)
            if 1 <= num <= 100:
                return num
            print("Please enter a number between 1 and 100.")
        except ValueError:
            print("Please enter a valid number.")

def main():
    search = ArxivSearch()
    
    while True:
        print("\n=== arXiv Paper Search ===")
        print("Enter your search query (or 'quit' to exit)")
        query = input("> ").strip()
        
        if query.lower() == 'quit':
            print("Goodbye!")
            break
            
        if not query:
            print("Please enter a valid search term.")
            continue
        
        try:
            # Get number of results
            num_results = get_number_of_results()
            if num_results == 0:  # User entered 'quit'
                continue
                
            print("\nSearching papers...")
            papers = search.search_papers(query, max_results=num_results)
            
            # Format and display results
            results_output = format_results(papers)
            print(results_output)
                
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            print("Please try again with different input.")

if __name__ == "__main__":
    main() 