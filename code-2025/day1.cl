;; sbcl --script code-2025/day1.cl

(require :uiop)

(defvar *str-arr* (
    uiop:split-string (
        uiop:read-file-string #p"data-2025/day1.txt") :separator ",") )
(defvar *arr-data* (mapcar #'(lambda (x) 
            (* (if (string= (subseq x 0 1) "L") -1 1) 
            (parse-integer (subseq x 1))) ) *str-arr*) )
(let 
    ((d 50)
    (c 0))
    (loop for x in *arr-data* do
        (if (= (setf d (mod (+ d x) 100)) 0) (incf c))
    )
    (print c)
    (terpri)
)
(let
    ((d 50)
    (c 0))
    (loop for x in *arr-data* do
        (incf c (abs (+ (if (or (> (setf d (+ d x)) 0) (= (- d x) 0)) 0 -1) (truncate d 100))))
        (setf d (mod d 100))
    )
    (print c)
    (terpri)
)
