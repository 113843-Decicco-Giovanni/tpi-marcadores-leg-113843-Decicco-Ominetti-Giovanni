namespace MapasBackend.Domain
{
    public class TokenClass
    {
        private static TokenClass _instance;
        public string Token { get; set; }

        private TokenClass() { }

        public static TokenClass Instance()
        {
            if( _instance == null)
            {
                _instance = new TokenClass();
            }
            return _instance;
        }
    }
}
