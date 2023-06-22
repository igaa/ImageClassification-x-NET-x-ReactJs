namespace organic_classification.Model.API
{
    public class APIResponseObj
    {
        private bool _status = false;
        private string _message = "Invalid data"; 
        public string message { get { return _message;  } set { _message = value;  } }
        public bool status { 
            get {
                return _status; 
            } set {
                _status = value; 
            } 
        }
        public object data  { get; set; }
    }
}
